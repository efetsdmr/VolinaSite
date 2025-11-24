import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { useLanguage } from './LanguageContext';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const { t } = useLanguage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    sector: '',
    email: '',
    phoneNumber: '',
    notes: ''
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsLoading(false);
      setErrors({});
      setFormData({
        fullName: '',
        companyName: '',
        sector: '',
        email: '',
        phoneNumber: '',
        notes: ''
      });
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.sector.trim()) {
      newErrors.sector = 'Sector is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrors({});

      // Map sector values to backend format
      const sectorMap: Record<string, string> = {
        dental: 'dis-klinigi',
        restaurant: 'restoran',
        ecommerce: 'e-ticaret',
        other: 'diger'
      };

      const requestBody = {
        name: formData.fullName,
        email: formData.email,
        company: formData.companyName,
        business_type: sectorMap[formData.sector],
        message: formData.notes,
        phone_number: formData.phoneNumber
      };

      try {
        const response = await fetch('https://ahudio-site-backend.onrender.com/contactUs/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const data = await response.json();
        console.log('Form submitted successfully:', data);
        setIsSuccess(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ 
          submit: 'Failed to submit form. Please try again.' 
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Modal */}
      <div 
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {!isSuccess ? (
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl text-[#333333] dark:text-white mb-3">
                {t.modal.demoTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                {t.modal.demoSubtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  {t.modal.demoName}
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Smith"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 dark:text-white ${
                    errors.fullName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-[#3366FF]'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <Label htmlFor="companyName" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  {t.modal.demoCompany}
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Acme Inc."
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 dark:text-white ${
                    errors.companyName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-[#3366FF]'
                  }`}
                />
                {errors.companyName && (
                  <p className="mt-2 text-sm text-red-500">{errors.companyName}</p>
                )}
              </div>

              {/* Sector */}
              <div>
                <Label htmlFor="sector" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  {t.modal.demoSector}
                </Label>
                <Select 
                  value={formData.sector} 
                  onValueChange={(value) => handleChange('sector', value)}
                >
                  <SelectTrigger 
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 dark:text-white ${
                      errors.sector 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-[#3366FF]'
                    }`}
                  >
                    <SelectValue placeholder={t.modal.demoSectorPlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectItem value="dental" className="dark:text-white dark:hover:bg-gray-700">{t.modal.demoSectorDental}</SelectItem>
                    <SelectItem value="restaurant" className="dark:text-white dark:hover:bg-gray-700">{t.modal.demoSectorRestaurant}</SelectItem>
                    <SelectItem value="ecommerce" className="dark:text-white dark:hover:bg-gray-700">{t.modal.demoSectorEcommerce}</SelectItem>
                    <SelectItem value="other" className="dark:text-white dark:hover:bg-gray-700">{t.modal.demoSectorOther}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sector && (
                  <p className="mt-2 text-sm text-red-500">{errors.sector}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <Label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  {t.modal.demoEmail}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@acme.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 dark:text-white ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-[#3366FF]'
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  {t.modal.demoPhone}
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 dark:text-white ${
                    errors.phoneNumber 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-[#3366FF]'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  {t.modal.demoMessage}
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Tell us about your use case..."
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-[#3366FF] bg-white dark:bg-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Submit Error Message */}
              {errors.submit && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm">{errors.submit}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-[#3366FF] hover:bg-[#3366FF]/90 text-white py-3 px-6 rounded-xl text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.modal.demoSubmit}
                    </span>
                  ) : (
                    t.modal.demoSubmit
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 px-6 rounded-xl text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.modal.tryCancel}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          // Success State
          <div className="p-8 sm:p-12 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-50 dark:from-green-950/30 dark:to-green-900/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl text-[#333333] dark:text-white mb-4">
                {t.modal.demoSuccess}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8">
                {t.modal.demoSuccessMessage}
              </p>
            </div>
            
            <Button
              onClick={onClose}
              className="w-full sm:w-auto bg-[#3366FF] hover:bg-[#3366FF]/90 text-white py-3 px-8 rounded-xl text-base transition-colors"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}