import Faqs from "../Models/faq";  

/**
 * Saves a list of FAQ translations to the database.
 * 
 * This function accepts an array of FAQ objects (translations) and inserts 
 * them into the database using the `insertMany` method.
 * In case of an error, it logs the error and throws a new error with a 
 * custom message.
 * 
 * @param {any[]} translations - An array of FAQ objects to be saved in the database.
 * @throws {Error} Throws an error if saving FAQs fails.
 */
export const saveFaqs = async (translations: any[]) => {
  try {
    await Faqs.insertMany(translations); 
  } catch (error) {
    console.error("Error saving FAQs:", error);
    throw new Error("Failed to save FAQs to the database"); 
  }
};

/**
 * Fetches FAQ data from the database based on the provided language.
 * 
 * This function queries the `Faqs` model to retrieve FAQ data for the specified
 * language. The `lang` parameter is used to filter the FAQ records by language.
 * In case of an error, it logs the error and throws a new error with a 
 * custom message.
 * 
 * @param {string} lang - The language code for which FAQs should be fetched (e.g., 'en', 'hi', 'bn').
 * @returns {Promise<any[]>} A promise that resolves to an array of FAQ documents.
 * @throws {Error} Throws an error if fetching FAQs fails.
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