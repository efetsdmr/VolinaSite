import React, { useState } from 'react';
import { Phone, Mail, Trash2, Plus } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface AuthorizedPerson {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  phone: string;
  email: string;
}

export function AdminContact() {
  const { language } = useLanguage();
  
  // Country codes
  const countryCodes = [
    { code: '+90', country: 'TR', flag: '🇹🇷' },
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+39', country: 'IT', flag: '🇮🇹' },
    { code: '+34', country: 'ES', flag: '🇪🇸' },
    { code: '+31', country: 'NL', flag: '🇳🇱' },
    { code: '+7', country: 'RU', flag: '🇷🇺' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
    { code: '+82', country: 'KR', flag: '🇰🇷' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+971', country: 'AE', flag: '🇦🇪' },
    { code: '+966', country: 'SA', flag: '🇸🇦' },
  ];

  // Format phone number: +90 555 444 3322
  const formatPhoneNumber = (countryCode: string, number: string) => {
    // Remove all non-digit characters
    const digits = number.replace(/\D/g, '');
    
    // Format based on length
    if (digits.length === 10) {
      // Turkish format: XXX XXX XX XX
      return `${countryCode} ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
    } else if (digits.length === 11) {
      // Format: XXX XXX XXXX
      return `${countryCode} ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    } else if (digits.length >= 7) {
      // Generic format: XXX XXX...
      return `${countryCode} ${digits.slice(0, 3)} ${digits.slice(3)}`;
    } else {
      // Just add country code
      return `${countryCode} ${digits}`;
    }
  };

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone number (7-15 digits)
  const isValidPhone = (phone: string): boolean => {
    if (!phone.trim()) return true; // Phone is optional
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  };

  // Validate landline phone (required, 7-15 digits)
  const isValidLandlinePhone = (phone: string): boolean => {
    if (!phone.trim()) return false; // Phone is required for landline
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  };

  // Validate email address for adding (required)
  const isValidEmailAddress = (email: string): boolean => {
    if (!email.trim()) return false; // Email is required
    return isValidEmail(email);
  };

  // Check if person form is valid
  const isPersonFormValid = (): boolean => {
    return (
      newPerson.firstName.trim() !== '' &&
      newPerson.lastName.trim() !== '' &&
      newPerson.email.trim() !== '' &&
      isValidEmailAddress(newPerson.email) &&
      isValidPhone(newPerson.phone)
    );
  };
  
  const [authorizedPersons, setAuthorizedPersons] = useState<AuthorizedPerson[]>([
    {
      id: '1',
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      department: language === 'tr' ? 'Satış' : 'Sales',
      phone: '+90 532 123 4567',
      email: 'ahmet.yilmaz@techflow.ai'
    },
    {
      id: '2',
      firstName: 'Elif',
      lastName: 'Demir',
      department: language === 'tr' ? 'Destek' : 'Support',
      phone: '+90 533 987 6543',
      email: 'elif.demir@techflow.ai'
    }
  ]);

  const [landlinePhones, setLandlinePhones] = useState<string[]>([
    '+90 212 555 1234',
    '+90 216 444 5678'
  ]);

  const [emailAddresses, setEmailAddresses] = useState<string[]>([
    'info@techflow.ai',
    'support@techflow.ai'
  ]);

  const [showAddPerson, setShowAddPerson] = useState(false);
  const [newPerson, setNewPerson] = useState<Omit<AuthorizedPerson, 'id'>>({
    firstName: '',
    lastName: '',
    department: '',
    phone: '',
    email: ''
  });

  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+90');
  const [selectedPersonCountryCode, setSelectedPersonCountryCode] = useState('+90');

  const handleAddPerson = () => {
    if (isPersonFormValid()) {
      const fullPhone = newPerson.phone ? formatPhoneNumber(selectedPersonCountryCode, newPerson.phone) : '';
      setAuthorizedPersons([
        ...authorizedPersons,
        { ...newPerson, phone: fullPhone, id: Date.now().toString() }
      ]);
      setNewPerson({
        firstName: '',
        lastName: '',
        department: '',
        phone: '',
        email: ''
      });
      setSelectedPersonCountryCode('+90');
      setShowAddPerson(false);
    }
  };

  const handleDeletePerson = (id: string) => {
    setAuthorizedPersons(authorizedPersons.filter(p => p.id !== id));
  };

  const handleAddPhone = () => {
    if (isValidLandlinePhone(newPhone.trim())) {
      const formattedPhone = formatPhoneNumber(selectedCountryCode, newPhone.trim());
      setLandlinePhones([...landlinePhones, formattedPhone]);
      setNewPhone('');
    }
  };

  const handleDeletePhone = (index: number) => {
    setLandlinePhones(landlinePhones.filter((_, i) => i !== index));
  };

  const handleAddEmail = () => {
    if (isValidEmailAddress(newEmail.trim())) {
      setEmailAddresses([...emailAddresses, newEmail.trim()]);
      setNewEmail('');
    }
  };

  const handleDeleteEmail = (index: number) => {
    setEmailAddresses(emailAddresses.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-[#3366FF] rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-4 text-white">
          <div className="bg-white/20 p-3 rounded-xl">
            <Phone className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl mb-1">
              {language === 'tr' ? 'İletişim' : 'Contact'}
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              {language === 'tr' 
                ? 'İletişim bilgileri ve yetkili kişiler'
                : 'Contact information and authorized persons'}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl sm:text-2xl text-[#333333] dark:text-white">
              {language === 'tr' ? 'İletişim Bilgileri' : 'Contact Information'}
            </h2>
          </div>
        </div>

        <div className="p-6">
          {/* Authorized Persons */}
          <div className="mb-8">
            <h3 className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {language === 'tr' ? 'Yetkili Kişiler' : 'Authorized Persons'}
            </h3>
            
            {/* Table for larger screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {language === 'tr' ? 'Ad' : 'First Name'}
                    </th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {language === 'tr' ? 'Soyad' : 'Last Name'}
                    </th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {language === 'tr' ? 'Departman' : 'Department'}
                    </th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {language === 'tr' ? 'Telefon' : 'Phone'}
                    </th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      Email
                    </th>
                    <th className="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {authorizedPersons.map((person) => (
                    <tr key={person.id} className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{person.firstName}</td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{person.lastName}</td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{person.department}</td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{person.phone}</td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{person.email}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeletePerson(person.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for mobile */}
            <div className="md:hidden space-y-3">
              {authorizedPersons.map((person) => (
                <div key={person.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-gray-900 dark:text-white">{person.firstName} {person.lastName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{person.department}</p>
                    </div>
                    <button
                      onClick={() => handleDeletePerson(person.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{person.phone}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{person.email}</p>
                </div>
              ))}
            </div>

            {/* Add Person Form */}
            {showAddPerson && (
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={language === 'tr' ? 'Ad' : 'First Name'}
                    value={newPerson.firstName}
                    onChange={(e) => setNewPerson({ ...newPerson, firstName: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder={language === 'tr' ? 'Soyad' : 'Last Name'}
                    value={newPerson.lastName}
                    onChange={(e) => setNewPerson({ ...newPerson, lastName: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder={language === 'tr' ? 'Departman' : 'Department'}
                    value={newPerson.department}
                    onChange={(e) => setNewPerson({ ...newPerson, department: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <select
                      value={selectedPersonCountryCode}
                      onChange={(e) => setSelectedPersonCountryCode(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[100px]"
                    >
                      {countryCodes.map(code => (
                        <option key={code.code} value={code.code}>{code.flag} {code.code}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder={language === 'tr' ? 'Telefon' : 'Phone'}
                      value={newPerson.phone}
                      onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value })}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={newPerson.email}
                  onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    newPerson.email && !isValidEmail(newPerson.email)
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 ${
                    newPerson.email && !isValidEmail(newPerson.email)
                      ? 'focus:ring-red-500'
                      : 'focus:ring-blue-500'
                  }`}
                />
                {newPerson.email && !isValidEmail(newPerson.email) && (
                  <p className="text-red-500 text-sm mt-1">
                    {language === 'tr' ? 'Geçerli bir e-posta adresi girin' : 'Enter a valid email address'}
                  </p>
                )}
                {newPerson.phone && !isValidPhone(newPerson.phone) && (
                  <p className="text-red-500 text-sm mt-1">
                    {language === 'tr' ? 'Telefon numarası 7-15 rakam olmalıdır' : 'Phone number must be 7-15 digits'}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleAddPerson}
                    disabled={!isPersonFormValid()}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      isPersonFormValid()
                        ? 'bg-[#3366FF] text-white hover:opacity-90 cursor-pointer'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {language === 'tr' ? 'Ekle' : 'Add'}
                  </button>
                  <button
                    onClick={() => setShowAddPerson(false)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {language === 'tr' ? 'İptal' : 'Cancel'}
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowAddPerson(true)}
              className="mt-4 flex items-center gap-2 text-[#3366FF] hover:text-[#2952CC] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>{language === 'tr' ? 'Yetkili Kişi Ekle' : 'Add Authorized Person'}</span>
            </button>
          </div>

          {/* Landline Phones */}
          <div className="mb-8">
            <h3 className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {language === 'tr' ? 'Sabit Telefonlar' : 'Landline Phones'}
            </h3>
            <div className="space-y-2">
              {landlinePhones.map((phone, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg px-4 py-3">
                  <span className="text-gray-700 dark:text-gray-300">{phone}</span>
                  <button
                    onClick={() => handleDeletePhone(index)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex gap-2 flex-1">
                <select
                  value={selectedCountryCode}
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[100px]"
                >
                  {countryCodes.map(code => (
                    <option key={code.code} value={code.code}>{code.flag} {code.code}</option>
                  ))}
                </select>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={language === 'tr' ? 'Telefon numarası ekle' : 'Add phone number'}
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddPhone()}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      newPhone && !isValidLandlinePhone(newPhone)
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 ${
                      newPhone && !isValidLandlinePhone(newPhone)
                        ? 'focus:ring-red-500'
                        : 'focus:ring-blue-500'
                    }`}
                  />
                  {newPhone && !isValidLandlinePhone(newPhone) && (
                    <p className="text-red-500 text-sm mt-1">
                      {language === 'tr' ? 'Telefon numarası 7-15 rakam olmalıdır' : 'Phone number must be 7-15 digits'}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleAddPhone}
                disabled={!isValidLandlinePhone(newPhone)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isValidLandlinePhone(newPhone)
                    ? 'bg-[#3366FF] text-white hover:opacity-90 cursor-pointer'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-60'
                }`}
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">{language === 'tr' ? 'Ekle' : 'Add'}</span>
              </button>
            </div>
          </div>

          {/* Email Addresses */}
          <div>
            <h3 className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {language === 'tr' ? 'E-posta Adresleri' : 'Email Addresses'}
            </h3>
            <div className="space-y-2">
              {emailAddresses.map((email, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg px-4 py-3">
                  <span className="text-gray-700 dark:text-gray-300">{email}</span>
                  <button
                    onClick={() => handleDeleteEmail(index)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder={language === 'tr' ? 'E-posta adresi ekle' : 'Add email address'}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    newEmail && !isValidEmailAddress(newEmail)
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 ${
                    newEmail && !isValidEmailAddress(newEmail)
                      ? 'focus:ring-red-500'
                      : 'focus:ring-blue-500'
                  }`}
                />
                {newEmail && !isValidEmailAddress(newEmail) && (
                  <p className="text-red-500 text-sm mt-1">
                    {language === 'tr' ? 'Geçerli bir e-posta adresi girin' : 'Enter a valid email address'}
                  </p>
                )}
              </div>
              <button
                onClick={handleAddEmail}
                disabled={!isValidEmailAddress(newEmail)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isValidEmailAddress(newEmail)
                    ? 'bg-[#3366FF] text-white hover:opacity-90 cursor-pointer'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-60'
                }`}
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">{language === 'tr' ? 'Ekle' : 'Add'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}