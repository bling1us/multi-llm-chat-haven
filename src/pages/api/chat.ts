import OpenAI from "openai";
import { Anthropic } from "@anthropic-ai/sdk";
import { StreamingTextResponse, experimental_StreamData } from 'ai';
import { OpenAIStream, AnthropicStream } from 'ai/streams';

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
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
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
    const stream = AnthropicStream(response);
    return new StreamingTextResponse(stream);
  }

  throw new Error(`Unsupported model: ${model}`);
}