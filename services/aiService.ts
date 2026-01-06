
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

export const getAIRecommendations = async (userPreference: string, products: Product[]): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given the user preference: "${userPreference}", and this list of products: ${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, desc: p.description })))}. Recommend the top 3 product IDs that match the sentiment.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const recommendedIds = JSON.parse(response.text || "[]");
    return recommendedIds;
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return [];
  }
};
