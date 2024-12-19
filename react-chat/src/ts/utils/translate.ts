import { TranslationRequest, TranslationResponse } from './types';
import { buildCacheKey, fetchTranslation, getFromCache, setToCache, handleErrors } from './helpers';

export async function translate({ text, fromLanguage, toLanguage, autoDetect = false }: TranslationRequest): Promise<TranslationResponse | null> {
  const sourceLang = autoDetect ? '' : fromLanguage;
  const cacheKey = buildCacheKey(text, sourceLang, toLanguage);

  const cachedTranslation = getFromCache(cacheKey);
  if (cachedTranslation) {
    console.log('Cache hit');
    return { translatedText: cachedTranslation, sourceLanguage: sourceLang };
  }

  return handleErrors(async () => {
    const translatedText = await fetchTranslation(text, sourceLang, toLanguage);
    setToCache(cacheKey, translatedText);
    return { translatedText, sourceLanguage: sourceLang };
  });
}
