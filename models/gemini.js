import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export default class GeminiModel {
    static get instance() {
        return new ChatGoogleGenerativeAI({
            apiKey: process.env.GEMINI_API_KEY,
            model: process.env.GEMINI_MODEL_NAME ?? "gemini-2.5-flash-lite",
            // Optional: configure safety settings, temperature, etc.
            // safetySettings: [...],
            // temperature: 0.7,
        });
    }
}
