import React, { useState, useEffect } from 'react';
import { X, Phone, Mic, MicOff, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TryVolinaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TryVolinaModal({ isOpen, onClose }: TryVolinaModalProps) {
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState<{ speaker: string; text: string }[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setCallState('idle');
      setIsMuted(false);
      setCallDuration(0);
      setTranscript([]);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'active') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setCallState('connecting');
    setTimeout(() => {
      setCallState('active');
      setTranscript([
        { speaker: 'AI', text: 'Hello! I\'m Volina, your AI assistant. How can I help you today?' }
      ]);
      
      setTimeout(() => {
        setTranscript(prev => [...prev, 
          { speaker: 'You', text: 'I\'d like to learn more about your AI voice agents.' }
        ]);
        
        setTimeout(() => {
          setTranscript(prev => [...prev, 
            { speaker: 'AI', text: 'Great! Our AI voice agents can handle customer calls 24/7, qualify leads, and schedule appointments automatically. Would you like to see a demo of specific features?' }
          ]);
        }, 2000);
      }, 3000);
    }, 1500);
  };

  const endCall = () => {
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 2000);
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
                  Try Volina AI Assistant
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
                onClick={startCall}
                className="w-full bg-gradient-to-r from-[#3366FF] to-[#8C51FF] hover:opacity-90 text-white py-5 rounded-2xl text-lg transition-opacity shadow-lg shadow-blue-500/30"
              >
                Start Demo Call
              </motion.button>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                This is a simulated demo for demonstration purposes
              </p>
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
                  Volina AI Assistant
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDuration(callDuration)}
                  </p>
                )}
              </div>

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
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`${
                            item.speaker === 'AI' 
                              ? 'text-left' 
                              : 'text-right'
                          }`}
                        >
                          <div className={`inline-block px-4 py-2 rounded-2xl ${
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
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      isMuted
                        ? 'bg-gray-300 dark:bg-gray-700'
                        : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {isMuted ? (
                      <MicOff className="w-6 h-6 text-gray-600 dark:text-gray-300" />
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
                Experience human-like AI conversations powered by Volina
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
