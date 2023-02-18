import { Configuration, OpenAIApi } from "openai";
import { MAX_TOKENS } from "../server/api/routers/prompts";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const excuteCreateCompletion = async ({
  prompt,
  temperature,
}: {
  prompt: string;
  temperature: number;
}) => {
  // const tokenLength = encode(prompt).length;
  return await openai.createCompletion({
    model: "text-davinci-003",
    temperature: temperature,
    max_tokens: MAX_TOKENS,
    prompt: prompt,
  });
};
