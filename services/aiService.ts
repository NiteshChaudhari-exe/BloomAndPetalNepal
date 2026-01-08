
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Product } from "../types";

export const getAIRecommendations = async (userPreference: string, products: Product[]): Promise<string[]> => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
  
  if (!apiKey) {
    console.warn("Gemini API key not configured, returning random recommendations");
    return products
      .filter(p => p.id !== userPreference)
      .slice(0, 3)
      .map(p => p.id);
  }
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent(
      `Given the user preference: "${userPreference}", and this list of products: ${JSON.stringify(
        products.map(p => ({ id: p.id, name: p.name, desc: p.description }))
      )}. Recommend the top 3 product IDs that match the sentiment. Return ONLY a JSON array of 3 product IDs like ["id1", "id2", "id3"]`
    );

    const text = response.response.text();
    const jsonMatch = text.match(/\[.*\]/s);
    
    if (jsonMatch) {
      const recommendedIds = JSON.parse(jsonMatch[0]);
      return Array.isArray(recommendedIds) ? recommendedIds.slice(0, 3) : [];
    }
    
    return [];
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    // Fallback to random recommendations
    return products
      .filter(p => p.id !== userPreference)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(p => p.id);
  }
};
