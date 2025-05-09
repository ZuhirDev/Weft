import React, { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { languageConfig } from "@/utils/i18n/languageConfig";


const LanguageSwitcher = () => {

  const { language, languages, changeLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    changeLanguage(langCode);
  }

  const currentLang = languageConfig[selectedLanguage];
  
  return (
    <>
      <Select onValueChange={handleLanguageChange}>
        <SelectTrigger>
          {currentLang ? (
            <div className="flex items-center gap-2">
              <img src={currentLang.icon} className="w-5 h-5 rounded-full" />
              {/* {currentLang.label} */}
            </div>
          ) : (
            'Selecciona un idioma'
          )}
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a Language</SelectLabel>
            {languages.map((lang) => {
              const langConfig = languageConfig[lang];
              return (
                <SelectItem key={lang} value={lang}>
                  <div className="flex items-center gap-2">
                    <img
                      src={langConfig.icon}
                      alt={lang}
                      className="w-5 h-5 rounded-full"
                    />
                    {langConfig.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default LanguageSwitcher;