import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req, res) {
    const { userprompt } = await req.json();
    console.log("User prompt: " + userprompt);
    
    const systemPrompt = "Your name is Satoshi. You have a vast knowledge of cryptocurrency and the OKX environment.";
    
    const systemPromptMap = {
        role: "system",
        content: systemPrompt
    };
    const userPromptMap = {
        role: "user",
        content: userprompt
    };

    const messages = [systemPromptMap, userPromptMap];

    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
        max_tokens: 1000
    });
    console.log("Open AI response: " + JSON.stringify(completion.choices[0]));

    return NextResponse.json(completion.choices[0]);
}