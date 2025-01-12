import { TranslationRequest, TranslationResponse } from '../types';
import { buildCacheKey, fetchTranslation, getFromCache, setToCache, handleErrors } from '../helpers/helpers';

export async function translate({ text, fromLanguage, toLanguage, autoDetect = false }: TranslationRequest): Promise<TranslationResponse | null> {
  const sourceLang = autoDetect || fromLanguage === "auto" ? "Autodetect" : fromLanguage;
    const cacheKey = buildCacheKey(text, sourceLang, toLanguage);
  
    const cachedTranslation = getFromCache(cacheKey);
    if (cachedTranslation) {
      console.log("Cache hit");
      return {originalText:text, translatedText: cachedTranslation, sourceLanguage: sourceLang, toLanguage };
    }
  
    return handleErrors(async () => {
      const translatedText = await fetchTranslation(text, sourceLang, toLanguage);
      setToCache(cacheKey, translatedText);
      return { originalText: text, translatedText, sourceLanguage: sourceLang, toLanguage };
    });
  }
  
