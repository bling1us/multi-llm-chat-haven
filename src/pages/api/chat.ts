import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { StreamingTextResponse, OpenAIStream, AnthropicStream } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, model, temperature, maxTokens, apiKey } = await req.json();

  if (model.startsWith("gpt")) {
    const openai = new OpenAI({ apiKey });
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true,
    });
    return new StreamingTextResponse(OpenAIStream(response));
  }

  if (model.startsWith("claude")) {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true,
    });
    return new StreamingTextResponse(AnthropicStream(response));
  }

  throw new Error(`Unsupported model: ${model}`);
}