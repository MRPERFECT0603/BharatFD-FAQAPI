import { Translate } from '@google-cloud/translate/build/src/v2';  
import { getFaqsByLanguageFromRepo } from "../Repository/faqsRepo";  

const translate = new Translate();

// Array of languages to translate to
const languages = ['hi', 'bn', 'ur'];  

/**
 * Translates text using the official Google Cloud Translate API
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (e.g., 'hi' for Hindi)
 */
const translateText = async (text: string, targetLang: string) => {
  try {
    const [translation] = await translate.translate(text, targetLang);  // Perform translation
    return translation; 
  } catch (error) {
    console.error(`Translation failed for ${targetLang}:`, error);
    return null;  
  }
};




/**
 * Translates both question and answer into all target languages and returns them as separate objects
 * @param {string} question - The original question text
 * @param {string} answer - The original answer text
 * @returns {Array} - Array of translation objects for each language
 */
export const translateData = async (question: string, answer: string) => {
  console.log("Original Question:", question);
  console.log("Original Answer:", answer);

  const translations = [];

  for (const lang of languages) {
    const translatedQuestion = await translateText(question, lang);
    const translatedAnswer = await translateText(answer, lang); 

    const translationObject = {
        question: translatedQuestion,  
        answer: translatedAnswer,  
        lang
    };

    translations.push(translationObject);
  }

  return translations; 
};


/**
 * Fetches FAQs by the specified language.
 * @param {string} lang - The language code (e.g., 'en', 'hi', 'bn').
 */
export const getFaqsByLanguage = async (lang: string) => {
  try {
    const faqs = await getFaqsByLanguageFromRepo(lang);
    return faqs;
  } catch (error) {
    console.error("Error in service:", error);
    throw new Error("Failed to fetch FAQs from the repository");
  }
};