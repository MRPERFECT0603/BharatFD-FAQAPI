import Faqs from "../Models/faq";  

export const saveFaqs = async (translations: any[]) => {
  try {
    for (const translation of translations) {
      const { lang, question, answer } = translation;

      const newFaq = new Faqs({
        lang,
        question,
        answer,
      });

      await newFaq.save();  
    }
  } catch (error) {
    console.error("Error saving FAQs:", error);
    throw new Error("Failed to save FAQs to the database");
  }
};

/**
 * Fetches FAQ data from the database based on the language.
 * @param {string} lang - The language code (e.g., 'en', 'hi', 'bn').
 */
export const getFaqsByLanguageFromRepo = async (lang: string) => {
    try {
      const faqs = await Faqs.find({ lang }).exec();  
      return faqs;
    } catch (error) {
      console.error("Error in repository:", error);
      throw new Error("Failed to fetch FAQs from the database");
    }
  };