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