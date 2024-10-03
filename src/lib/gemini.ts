"use server";

import axios from "axios"

export const sendPromptToGemini = async ({ prompt }: { prompt: string }) => {
    const req = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        contents: [
            { "parts": [{ "text": prompt }] }
        ]
    })

    try {
        let response: string = req.data.candidates[0].content.parts[0].text

        // Format response
        response = response.replace("```json", "").replace("```", "")

        return JSON.parse(response)
    } catch {
        return {
            error: "Resposta indisponível"
        }
    }
}