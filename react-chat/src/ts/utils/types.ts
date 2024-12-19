// ./ts/utils/types.ts
export interface TranslationRequest {
  text: string;
  fromLanguage: string;
  toLanguage: string;
  autoDetect?: boolean;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLanguage?: string;
}
