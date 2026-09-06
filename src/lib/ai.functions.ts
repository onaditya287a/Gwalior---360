import process from "node:process"; 
import { createServerFn } from "@tanstack/react-start";



export const askGwaliorGuide = createServerFn({ method: "POST" })
  .validator((data: { question: string }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env["GEMINI_API_KEY"];

    if (!apiKey) {
      throw new Error("Gemini API key is not configured.");
    }

    const systemPrompt = `
You are a helpful AI tourism guide for Gwalior, India.

Rules:
- Focus mainly on Gwalior tourism, history, heritage, monuments, food and travel.
- Give simple, clear and helpful answers.
- If you are not sure about a current fact such as today's opening hours or ticket prices, clearly say that the information should be verified from an official source.
- Do not invent facts.
- Keep answers reasonably short unless the user asks for details.
- Be friendly and helpful.

User question:
${data.question}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: systemPrompt }],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini error:", errorText);
      throw new Error("AI Guide could not answer right now.");
    }

    const result: any = await response.json();

    const answer =
      result.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I could not find an answer right now.";

    return { answer };
  });