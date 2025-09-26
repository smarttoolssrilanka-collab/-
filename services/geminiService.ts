
import { GoogleGenAI, Type } from "@google/genai";
import type { HoroscopeInput, HoroscopeOutput } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const horoscopeSchema = {
  type: Type.OBJECT,
  properties: {
    date: { type: Type.STRING, description: "හෙට දිනය (YYYY-MM-DD)." },
    name: { type: Type.STRING, description: "ලබාදුන් නම." },
    summary: { type: Type.STRING, description: "දවසේ සාරාංශය (පේලි 1-2)." },
    career_money: { type: Type.STRING, description: "වෘත්තිය සහ මුදල් පිළිබඳ උපදෙස්." },
    emergencies_and_cautions: { type: Type.STRING, description: "හදිසි අනතුරු සහ ප්‍රවේශම් විය යුතු කරුණු." },
    travel_direction: { type: Type.STRING, description: "ගමන් සඳහා සුබ දිශාව." },
    outfit_color: { type: Type.STRING, description: "ඇඳුම් සඳහා සුබ වර්ණය." },
    planetary_influences: { type: Type.STRING, description: "ප්‍රධාන ග්‍රහ බලපෑම්." },
    strengths: { type: Type.STRING, description: "දවසේ ශක්තීන්." },
    weaknesses: { type: Type.STRING, description: "දවසේ දුර්වලතා." },
    love_relationships: { type: Type.STRING, description: "ආදරය සහ සබඳතා." },
    health_wellbeing: { type: Type.STRING, description: "සෞඛ්‍යය සහ යහපැවැත්ම." },
    future_advice: { type: Type.STRING, description: "අනාගතය සඳහා කෙටි උපදෙස්." },
    lucky_numbers: { type: Type.ARRAY, items: { type: Type.INTEGER }, description: "ජය අංක." },
    lucky_time: { type: Type.STRING, description: "ජයග්‍රාහී වේලාව (උදා: 'පෙ.ව. 9:00 - පෙ.ව. 11:00')." },
    rituals_recommendations: { type: Type.STRING, description: "නිර්දේශිත චාරිත්‍ර වාරිත්‍ර." },
    compatibility_tip: { type: Type.STRING, description: "ගැළපීම පිළිබඳ උපදෙසක්." },
    confidence: { type: Type.NUMBER, description: "විශ්වාසනීයත්ව මට්ටම (0.00-1.00)." },
    notes: { type: Type.STRING, description: "විකල්ප සටහන්." },
  },
  required: [
    "date", "name", "summary", "career_money", "emergencies_and_cautions",
    "travel_direction", "outfit_color", "planetary_influences", "strengths",
    "weaknesses", "love_relationships", "health_wellbeing", "future_advice",
    "lucky_numbers", "lucky_time", "rituals_recommendations", "compatibility_tip",
    "confidence", "notes"
  ]
};


export const generateHoroscope = async (formData: HoroscopeInput): Promise<HoroscopeOutput> => {
  try {
    const refDate = new Date(formData.reference_date);
    refDate.setDate(refDate.getDate() + 1);
    const tomorrowDate = refDate.toISOString().split('T')[0];

    const prompt = `
      ඔබ වෘත්තීය ජ්‍යෙතිෂ්‍ය විශ්ලේෂකයෙකි. 
      දෙන ලද තොරතුරු (නම, උපන් දිනය, උපන් වේලාව, උපන් ස්ථානය, ලග්නය) අනුව, "${formData.name}" සඳහා "${tomorrowDate}" දිනයට අදාළව සිංහලෙන් සරල, පැහැදිලි, සහ ව්‍යවස්ථිත දෛනික පලාපලයක් (horoscope/daily guidance) සකසන්න.

      **පරිශීලක තොරතුරු:**
      - නම: ${formData.name}
      - උපන් දිනය: ${formData.birth_date}
      - උපන් වේලාව: ${formData.birth_time}
      - උපන් ස්ථානය: ${formData.birth_place}
      - ලග්නය: ${formData.lagna}

      **උපදෙස්:**
      - ප්‍රතිචාරය ලබාදිය යුත්තේ ඔබ වෙත ලබා දී ඇති JSON ව්‍යුහයට අනුව පමණි.
      - අර්ථවත්, කෙටි, සහ ක්‍රියාත්මක කළ හැකි උපදෙස් ලබා දෙන්න.
      - තොරතුරු නොමැති ක්ෂේත්‍ර සඳහා "නැත" හෝ "අවශ්‍ය තොරතුරු නොමැත" ලෙස සඳහන් කරන්න.
      - වෛද්‍ය, නීති, හෝ මූල්‍ය උපදෙස් අවශ්‍ය අවස්ථාවලදී, වෘත්තීය උපදෙස් ලබාගැනීමට යොමු කරන සටහනක් ඇතුළත් කරන්න.
      - විශ්වාසනීයත්ව මට්ටම (confidence) 0.00-1.00 අතර අගයකින් දක්වන්න.
      - "date" ක්ෂේත්‍රය "${tomorrowDate}" විය යුතුය.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: horoscopeSchema,
        },
    });
    
    const jsonText = response.text.trim();
    const result: HoroscopeOutput = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error generating horoscope:", error);
    throw new Error("පලාපල සැකසීමේදී දෝෂයක් ඇතිවිය. කරුණාකර නැවත උත්සාහ කරන්න.");
  }
};
