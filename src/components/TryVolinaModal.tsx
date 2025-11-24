import React, { useState, useEffect, useRef } from 'react';
import { X, Phone, Mic, MicOff, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { vapiConfig } from '../config/vapi.config';

interface TryVolinaModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflowId?: string;
  assistantName?: string;
}

export function TryVolinaModal({ isOpen, onClose, workflowId, assistantName = 'Volina AI Assistant' }: TryVolinaModalProps) {
  const [callState, setCallState] = useState<'idle' | 'permission' | 'connecting' | 'active' | 'ended'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [transcript, setTranscript] = useState<{ speaker: string; text: string; timestamp: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  const vapiRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Vapi dynamically
  useEffect(() => {
    const initVapi = async () => {
      try {
        const publicKey = vapiConfig.publicKey;
        if (!publicKey) {
          console.warn('Vapi public key not found');
          return;
        }

        // Dynamic import to avoid SSR issues
        const { default: Vapi } = await import('@vapi-ai/web');
        
        if (!vapiRef.current) {
          vapiRef.current = new Vapi(publicKey);
          
          // Set up event listeners
          vapiRef.current.on('call-start', () => {
            console.log('Call started');
            setCallState('active');
            setStatusMessage('Connected');
            setError(null);
          });

          vapiRef.current.on('call-end', () => {
            console.log('Call ended');
            setCallState('ended');
            setStatusMessage('Call ended');
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
          });

          vapiRef.current.on('speech-start', () => {
            console.log('AI started speaking');
            setStatusMessage('AI speaking...');
            setIsSpeaking(true);
          });

          vapiRef.current.on('speech-end', () => {
            console.log('AI finished speaking');
            setStatusMessage('Listening...');
            setIsSpeaking(false);
          });

          vapiRef.current.on('message', (message: any) => {
            console.log('Message received:', message);
            
            // Handle transcript messages
            if (message.type === 'transcript' && message.transcriptType === 'final') {
              const speaker = message.role === 'assistant' ? 'AI' : 'You';
              setTranscript(prev => [...prev, {
                speaker,
                text: message.transcript,
                timestamp: Date.now()
              }]);
            }
          });

          vapiRef.current.on('error', (error: any) => {
            console.error('Vapi error:', error);
            setError(error?.message || 'An error occurred');
            setCallState('idle');
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
          });
        }
      } catch (err) {
        console.error('Failed to initialize Vapi:', err);
        setError('Failed to load voice service. Please check your internet connection.');
      }
    };

    initVapi();

    return () => {
      // Cleanup on unmount
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (err) {
          console.error('Error stopping call:', err);
        }
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setCallState('idle');
      setIsMuted(false);
      setCallDuration(0);
      setStatusMessage('');
      setTranscript([]);
      setError(null);
      
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (err) {
          console.error('Error stopping call:', err);
        }
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (callState === 'active' && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else if (callState !== 'active' && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [callState]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = async () => {
    if (!vapiRef.current && !isDemoMode) {
      setError('Voice service not initialized. Please refresh the page.');
      setCallState('idle');
      return;
    }

    setCallState('connecting');
    setStatusMessage('Requesting microphone access...');
    setError(null);

    try {
      // First, request microphone permission explicitly
      console.log('Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Stop the stream immediately - we just needed permission
      stream.getTracks().forEach(track => track.stop());
      
      console.log('Microphone permission granted!');
      setStatusMessage('Connecting to AI...');

      if (workflowId) {
        // Start with workflow - pass directly as string
        await vapiRef.current.start(workflowId);
      } else {
        // Start with assistant ID - pass directly as string
        const assistantId = vapiConfig.assistantId;
        if (!assistantId) {
          throw new Error('Assistant ID not configured');
        }
        console.log('Starting call with assistant ID:', assistantId);
        await vapiRef.current.start(assistantId);
      }
    } catch (err: any) {
      console.error('Failed to start call:', err);
      
      // Check if it's a permission error
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone access denied. Please allow microphone access in your browser settings and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone and try again.');
      } else {
        setError(err?.message || 'Failed to start call. Please try again.');
      }
      
      setCallState('permission');
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      try {
        vapiRef.current.stop();
      } catch (err) {
        console.error('Error ending call:', err);
      }
    }
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const toggleMute = () => {
    if (vapiRef.current) {
      try {
        vapiRef.current.setMuted(!isMuted);
        setIsMuted(!isMuted);
      } catch (err) {
        console.error('Error toggling mute:', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg"
      >
        <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          {/* Error Message */}
          {error && (
            <div className="absolute top-16 left-4 right-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 z-10">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {callState === 'idle' && (
            <div className="p-8 sm:p-12 text-center">
              {/* Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#3366FF] to-[#8C51FF] mb-6 shadow-lg shadow-blue-500/30">
                  <Phone className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl text-[#333333] dark:text-white mb-3">
                  {assistantName}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Experience our AI voice agent in action
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-3 mb-8 text-left max-w-sm mx-auto"
              >
                {[
                  'Natural conversation flow',
                  'Real-time voice recognition',
                  'Smart appointment scheduling',
                  'Multi-language support'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </motion.div>

              {/* Start Call Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setCallState('permission')}
                disabled={!!error}
                className="w-full bg-gradient-to-r from-[#3366FF] to-[#8C51FF] hover:opacity-90 text-white py-5 rounded-2xl text-lg transition-opacity shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Voice Call
              </motion.button>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Powered by Vapi AI • Real voice conversation
              </p>
            </div>
          )}

          {/* PERMISSION REQUEST SCREEN */}
          {callState === 'permission' && (
            <div className="p-8 sm:p-12 text-center">
              {/* Microphone Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-[#3366FF] to-[#8C51FF] mb-6 shadow-2xl shadow-blue-500/40">
                  <Mic className="w-16 h-16 text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl text-[#333333] dark:text-white mb-4"
              >
                Microphone Access Required
              </motion.h2>

              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4 mb-8"
              >
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  To talk with our AI voice agent, we need access to your microphone.
                </p>

                {error && (
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-2xl p-4 border-2 border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-2">
                      ⚠️ <strong>Figma Environment Limitation</strong>
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-500">
                      Microphone access may be restricted in Figma's iframe preview. For full voice functionality, please:
                    </p>
                    <ul className="text-xs text-yellow-600 dark:text-yellow-500 mt-2 space-y-1 list-disc list-inside">
                      <li>Open this in a new browser tab (not in Figma)</li>
                      <li>Or deploy to a real website</li>
                      <li>Or check your browser's microphone settings</li>
                    </ul>
                  </div>
                )}
                
                {/* Permission Steps */}
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3 text-left">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3366FF] text-white flex items-center justify-center text-sm mt-1">
                      1
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 mb-1">
                        Click <strong>"Allow Microphone"</strong> button below
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-left mt-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3366FF] text-white flex items-center justify-center text-sm mt-1">
                      2
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 mb-1">
                        Your browser will ask for permission
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-left mt-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3366FF] text-white flex items-center justify-center text-sm mt-1">
                      3
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 mb-1">
                        Click <strong>"Allow"</strong> in the browser popup
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Your voice is private and secure</span>
                </div>
              </motion.div>

              {/* Allow Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={startCall}
                className="w-full bg-gradient-to-r from-[#3366FF] to-[#8C51FF] hover:opacity-90 text-white py-5 rounded-2xl text-lg transition-opacity shadow-lg shadow-blue-500/30 mb-3"
              >
                🎤 Allow Microphone & Start Call
              </motion.button>

              {/* Cancel Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setCallState('idle')}
                className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-3 rounded-xl transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          )}

          {(callState === 'connecting' || callState === 'active') && (
            <div className="p-8 sm:p-12">
              {/* Avatar with Animation */}
              <div className="relative mb-8">
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Pulse rings */}
                    {callState === 'active' && !isMuted && (
                      <>
                        <motion.div
                          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full bg-[#3366FF]/30"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                          className="absolute inset-0 rounded-full bg-[#8C51FF]/30"
                        />
                      </>
                    )}
                    
                    {/* Main Avatar */}
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#3366FF] to-[#8C51FF] flex items-center justify-center shadow-2xl">
                      <Phone className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Info */}
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl text-[#333333] dark:text-white mb-2">
                  {assistantName}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-1">
                  {callState === 'connecting' && (
                    <>
                      <motion.div
                        animate={{ opacity: [0.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                        className="w-2 h-2 rounded-full bg-yellow-500"
                      />
                      <p className="text-lg text-gray-600 dark:text-gray-300">Connecting...</p>
                    </>
                  )}
                  {callState === 'active' && (
                    <>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-lg text-green-600 dark:text-green-400">Active Call</p>
                    </>
                  )}
                </div>
                {callState === 'active' && (
                  <>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {formatDuration(callDuration)}
                    </p>
                    {statusMessage && (
                      <p className="text-xs text-[#3366FF]">
                        {statusMessage}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Microphone Instructions - ACTIVE CALL */}
              {callState === 'active' && (
                <div className="mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-4 border-2 border-dashed border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      {!isMuted ? (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Mic className="w-6 h-6 text-[#3366FF]" />
                          </motion.div>
                          <p className="text-[#3366FF]">
                            🎤 Microphone Active - Speak Now!
                          </p>
                        </>
                      ) : (
                        <>
                          <MicOff className="w-6 h-6 text-red-500" />
                          <p className="text-red-600 dark:text-red-400">
                            Microphone Muted
                          </p>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                      {!isMuted 
                        ? "Start talking - the AI will respond to your voice" 
                        : "Click the microphone button below to unmute"}
                    </p>
                  </motion.div>
                </div>
              )}

              {/* Live Transcript */}
              {callState === 'active' && transcript.length > 0 && (
                <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl p-4 max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Volume2 className="w-4 h-4 text-[#3366FF]" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Live Transcript</span>
                  </div>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {transcript.map((item, index) => (
                        <motion.div
                          key={item.timestamp}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`${
                            item.speaker === 'AI' 
                              ? 'text-left' 
                              : 'text-right'
                          }`}
                        >
                          <div className={`inline-block px-4 py-2 rounded-2xl max-w-[85%] ${
                            item.speaker === 'AI'
                              ? 'bg-blue-50 dark:bg-blue-950/30 text-gray-700 dark:text-gray-300'
                              : 'bg-purple-50 dark:bg-purple-950/30 text-gray-700 dark:text-gray-300'
                          }`}>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.speaker}</p>
                            <p className="text-sm">{item.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Call Controls */}
              {callState === 'active' && (
                <div className="flex items-center justify-center gap-4">
                  {/* Mute Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMute}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      isMuted
                        ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700'
                        : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {isMuted ? (
                      <MicOff className="w-6 h-6 text-red-600 dark:text-red-400" />
                    ) : (
                      <Mic className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    )}
                  </motion.button>

                  {/* End Call Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={endCall}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 hover:opacity-90 transition-opacity"
                  >
                    <Phone className="w-8 h-8 text-white rotate-[135deg]" />
                  </motion.button>
                </div>
              )}

              {/* Connecting State */}
              {callState === 'connecting' && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-[#3366FF] border-t-transparent rounded-full"
                    />
                    <span className="text-sm text-[#3366FF]">Initializing voice connection...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {callState === 'ended' && (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl text-[#333333] dark:text-white mb-3">Call Ended</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                Duration: {formatDuration(callDuration)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Thank you for trying Volina AI!
              </p>
            </div>
          )}

          {/* Bottom Info */}
          {callState !== 'ended' && (
            <div className="px-8 pb-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                🔒 Secure voice connection • Real AI conversation
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}