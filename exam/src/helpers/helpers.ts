const localCache = new Map<string, string>();

export function buildCacheKey(text: string, fromLanguage: string, toLanguage: string): string {
  return `${fromLanguage}|${toLanguage}:${text}`;
}

export function fetchTranslation(query: string, fromLanguage: string, toLanguage: string): Promise<string> {
  const api = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=${fromLanguage}|${toLanguage}`;

  return fetch(api)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      if (data.responseStatus !== 200) throw new Error(data.responseDetails);
      return data.responseData.translatedText;
    });
}

export function getFromCache(key: string): string | undefined {
  return localCache.get(key);
}

export function setToCache(key: string, value: string): void {
  localCache.set(key, value);
}

export function handleErrors<T>(fn: () => Promise<T>): Promise<T | null> {
  return fn().catch((err) => {
    console.error("Error occurred:", err);
    return null;
  });
}
