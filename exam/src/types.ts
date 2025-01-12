export interface TranslationRequest {
  text: string;
  fromLanguage: string;
  toLanguage: string;
  autoDetect?: boolean;
}

export interface TranslationResponse {
  originalText: string,
  translatedText: string;
  sourceLanguage?: string;
  toLanguage: string;
}
