'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, translations, TranslationKey } from '@/lib/translations'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LangCtx>({
  lang: 'en',
  setLang: () => {},
  t: (key) => translations.en[key] as string,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  // Načti jazyk z localStorage při startu
  useEffect(() => {
    const saved = localStorage.getItem('rashid-lang') as Lang | null
    if (saved && ['en','cs','de'].includes(saved)) setLang(saved)
  }, [])

  // Ulož jazyk do localStorage při změně
  const handleSetLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem('rashid-lang', l)
  }

  const t = (key: TranslationKey) => (translations[lang][key] ?? translations.en[key]) as string

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
