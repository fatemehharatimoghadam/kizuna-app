export type TranslationLanguage = "fa";

export interface TranslationRequest {
  text: string;
  targetLanguage: TranslationLanguage;
}

export interface TranslationResult {
  translatedText: string;
  targetLanguage: TranslationLanguage;
}