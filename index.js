import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

function addTwoNumbers(x , y) {
  return x + y;
}

const SYSTEM_PROMPT = `
  You are a helpfull AI Assistant who is designed to resolve user query.
  If you think, user query needs a tool invocation , just tell me tool
  name with parameters.

  Available Tools: 
  - addTwoNumbers(x: number , y: number): Returns Number
`

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:  [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT + "What is 5 + 9" }]
      }
    ],
  });
  console.log(response.text);
}

await main();