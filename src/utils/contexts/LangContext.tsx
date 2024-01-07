import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru';

interface LanguageContext {
  language: Language;
  updateLanguage: (language: Language) => void;
}

const languageContext = createContext<LanguageContext>({
  language: 'en',
  updateLanguage: (): void => {},
});

export const useLanguageContext = (): LanguageContext => {
  const context = useContext(languageContext);
  if (!context) {
    throw new Error(
      'useLanguageContext must be used within a LanguageProvider'
    );
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <languageContext.Provider value={{ language, updateLanguage: setLanguage }}>
      {children}
    </languageContext.Provider>
  );
};
