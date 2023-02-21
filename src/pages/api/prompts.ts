import GPT3Tokenizer from "gpt3-tokenizer";
import type { NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";
import { env } from "core/env.mjs";
import { OpenAIStream } from "server/libs/openai";
import { SERVER_PREDICTION_PROMPTS } from "server/libs/prompts";

const MAXIMUM_TOKEN_LENGTH = 4097;
export const MAX_TOKENS = 700;
const MAXIMUM_PROMPT_LENGTH = MAXIMUM_TOKEN_LENGTH - MAX_TOKENS;

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    return action(req);
  }
  return new Response("Not Found", { status: 404 });
}

const action = async (req: NextRequest) => {
  const input = (await req.json()) as {
    id: string;
    text: string;
  };

  const prompt = SERVER_PREDICTION_PROMPTS.find(
    (prompt) => prompt.id === input.id
  );

  if (!prompt) {
    return new Response("올바르지 않은 프롬프트입니다.", {
      status: 400,
    });
  }
  const promptText = prompt.template({ input: input.text });
  const promptLength = tokenizer.encode(promptText).text.length;

  if (promptLength > MAXIMUM_PROMPT_LENGTH) {
    return new Response("텍스트가 너무 길어요! 조금만 줄여주세요.", {
      status: 400,
    });
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promptText,
      max_tokens: MAX_TOKENS,
      temperature: prompt.temperature,
      stream: true,
    });
    const stream = OpenAIStream(completion);
    return new Response(stream);
  } catch (error) {
    return new Response(
      "OPENAI 서버에 문제가 생겼어요. 잠시 후 다시 시도해주세요.",
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
};
