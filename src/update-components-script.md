# Component Translation Update Script

Bu dosya sadece planlama içindir. Aşağıdaki component'lerin güncellenmesi gerekiyor:

1. ✅ Hero.tsx - TAMAMLANDI
2. Footer.tsx
3. ProblemSolution.tsx  
4. HowItWorks.tsx
5. Features.tsx
6. Testimonials.tsx
7. AdminPanel.tsx
8. Pricing.tsx
9. DemoModal.tsx
10. TryVolinaModal.tsx

Her component için:
- import { useLanguage } from './LanguageContext'; ekle
- const { t } = useLanguage(); ekle
- Hardcoded metinleri t.section.key ile değiştir
