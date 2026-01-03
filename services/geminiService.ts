
import { GoogleGenAI, Type } from "@google/genai";

// Helper to strip markdown formatting if the model returns it
const cleanJsonResponse = (text: string | undefined): string => {
  if (!text) return '{}';
  return text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
};

export const generateContent = async (prompt: string, schema?: any) => {
  // Mandatory check for Gemini 3 models as per instructions
  if (typeof window !== 'undefined' && window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio.openSelectKey();
    }
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = "gemini-3-pro-preview";

    const config: any = {
      temperature: 0.7,
      topP: 0.95,
    };

    if (schema) {
      config.responseMimeType = "application/json";
      config.responseSchema = schema;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config,
    });

    const text = response.text;
    
    if (schema) {
      return cleanJsonResponse(text);
    }
    return text || '';
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("Requested entity was not found") && typeof window !== 'undefined' && window.aistudio) {
      await window.aistudio.openSelectKey();
    }
    throw error;
  }
};

export const AttendanceInsightSchema = {
  type: Type.OBJECT,
  properties: {
    summary: { 
      type: Type.STRING, 
      description: "A summary of today's attendance patterns and concerns." 
    },
    notifications: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          studentName: { type: Type.STRING },
          draftEmail: { type: Type.STRING, description: "Professional draft to parents regarding absence." }
        },
        required: ["studentName", "draftEmail"]
      }
    }
  },
  required: ["summary", "notifications"]
};

export const LessonPlanSchema = {
  type: Type.OBJECT,
  properties: {
    objectives: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of learning objectives"
    },
    activities: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of classroom activities"
    },
    teachingMethod: {
      type: Type.STRING,
      description: "Proposed teaching methodology"
    },
    assessment: {
      type: Type.STRING,
      description: "Methods for assessing student understanding"
    }
  },
  required: ["objectives", "activities", "teachingMethod", "assessment"]
};

export const QuestionPaperSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    instructions: { type: Type.STRING },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          number: { type: Type.NUMBER },
          text: { type: Type.STRING },
          marks: { type: Type.NUMBER },
          type: { type: Type.STRING }
        },
        required: ["number", "text", "marks", "type"]
      }
    }
  },
  required: ["title", "instructions", "questions"]
};
