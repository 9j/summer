import { Configuration, OpenAIApi } from "openai";

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
    max_tokens: 700,
    prompt: prompt,
  });
};
