import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function AdminAbout() {
  const { language } = useLanguage();
  
  const [aboutData, setAboutData] = useState({
    description: language === 'tr' 
      ? 'TechFlow AI, yapay zeka destekli iş süreçleri otomasyonu alanında faaliyet gösteren yenilikçi bir teknoloji şirketidir. 2019 yılında kurulan şirketimiz, orta ve büyük ölçekli işletmelere özel AI çözümleri sunarak onların dijital dönüşüm yolculuklarında güvenilir bir iş ortağı olmayı hedeflemektedir. Müşteri odaklı yaklaşımımız ve sürekli gelişen teknoloji altyapımız sayesinde 150\'den fazla şirketin operasyonel verimliliğini artırmalarına katkıda bulunduk.'
      : 'TechFlow AI is an innovative technology company operating in the field of artificial intelligence-supported business process automation. Founded in 2019, our company aims to be a reliable business partner in the digital transformation journeys of medium and large-scale enterprises by offering customized AI solutions. Thanks to our customer-oriented approach and continuously evolving technology infrastructure, we have contributed to increasing the operational efficiency of more than 150 companies.',
    mission: language === 'tr'
      ? 'Misyonumuz\n\nYapay zeka teknolojilerini erişilebilir ve kullanılabilir kılarak işletmelerin rekabet gücünü artırmak. Müşterilerimizin iş süreçlerini optimize ederek zaman ve maliyet tasarrufu sağlamalarına yardımcı olmak.\n\nEkibimiz, makine öğrenimi, doğal dil işleme ve bilgisayarlı görü alanlarında uzmanlaşmış 40+ mühendis ve veri bilimciden oluşmaktadır. Sürekli eğitim ve ar-ge çalışmalarıyla sektördeki en güncel teknolojileri takip ederek müşterilerimize en iyi çözümleri sunuyoruz.\n\nKalite standartlarımız ISO 27001 ve SOC 2 sertifikalarıyla desteklenmektedir. Veri güvenliği ve gizliliği konularında en yüksek standartları uyguluyoruz.'
      : 'Our Mission\n\nTo increase the competitiveness of businesses by making artificial intelligence technologies accessible and usable. To help our customers save time and cost by optimizing their business processes.\n\nOur team consists of 40+ engineers and data scientists specialized in machine learning, natural language processing and computer vision. We follow the most up-to-date technologies in the sector with continuous training and R&D studies and offer the best solutions to our customers.\n\nOur quality standards are supported by ISO 27001 and SOC 2 certifications. We apply the highest standards in data security and privacy.',
    vision: language === 'tr'
      ? 'Vizyonumuz\n\n2030 yılına kadar EMEA bölgesinin önde gelen yapay zeka çözümleri sağlayıcısı olmak ve 1000+ kurumsal müşteriye hizmet veren global bir marka haline gelmek.\n\nSürdürülebilir ve etik yapay zeka uygulamalarını teşvik ederek, teknolojinin topluma fayda sağlayan bir araç olarak kullanılmasını destekliyoruz. Açık kaynak topluluğuna aktif katkıda bulunarak bilgi paylaşımını ve inovasyonu destekliyoruz.\n\nAraştırma ve geliştirme yatırımlarımızı her yıl %25 artırarak, yeni nesil AI teknolojilerinin öncüsü olmayı hedefliyoruz. Üniversiteler ve araştırma kurumlarıyla işbirlikleri geliştirerek akademik çalışmaları endüstriyel uygulamalara dönüştürüyoruz.'
      : 'Our Vision\n\nTo become the leading artificial intelligence solutions provider in the EMEA region by 2030 and to become a global brand serving 1000+ corporate customers.\n\nWe support the use of technology as a tool that benefits society by promoting sustainable and ethical artificial intelligence applications. We support knowledge sharing and innovation by actively contributing to the open source community.\n\nWe aim to be a pioneer of next-generation AI technologies by increasing our research and development investments by 25% every year. We transform academic studies into industrial applications by developing collaborations with universities and research institutions.'
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // Here you would typically save to a database
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div>
      {/* Header with gradient background */}
      <div className="bg-[#3366FF] rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-4 text-white">
          <div className="bg-white/20 p-3 rounded-xl">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl mb-1">
              {language === 'tr' ? 'Hakkında' : 'About'}
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              {language === 'tr' 
                ? 'Şirket misyonu, vizyonu ve detaylı açıklama'
                : 'Company mission, vision and detailed description'}
            </p>
          </div>
        </div>
      </div>

      {/* About Company Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl sm:text-2xl text-[#333333] dark:text-white">
              {language === 'tr' ? 'Şirket Hakkında' : 'About Company'}
            </h2>
          </div>
        </div>

        <div className="p-6">
          {/* Detailed Description */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              {language === 'tr' ? 'Detaylı Açıklama' : 'Detailed Description'}
            </label>
            <textarea
              value={aboutData.description}
              onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder={language === 'tr' ? 'Şirket açıklamasını buraya yazın...' : 'Write company description here...'}
            />
          </div>

          {/* Mission */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              {language === 'tr' ? 'Misyon' : 'Mission'}
            </label>
            <textarea
              value={aboutData.mission}
              onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
              rows={8}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-auto"
              placeholder={language === 'tr' ? 'Şirket misyonunu buraya yazın...' : 'Write company mission here...'}
            />
          </div>

          {/* Vision */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              {language === 'tr' ? 'Vizyon' : 'Vision'}
            </label>
            <textarea
              value={aboutData.vision}
              onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
              rows={8}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-auto"
              placeholder={language === 'tr' ? 'Şirket vizyonunu buraya yazın...' : 'Write company vision here...'}
            />
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              <Save className="w-5 h-5" />
              <span>{language === 'tr' ? 'Kaydet' : 'Save'}</span>
            </button>
            
            {isSaved && (
              <span className="text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {language === 'tr' ? 'Kaydedildi!' : 'Saved!'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}