import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const shortSummary = async (input: string) =>
  await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0.7,
    max_tokens: 100,
    prompt: `Summarize the text below but keep it concise. Summarize using plain and simple language and keep the same tense.

"""
${input}
"""
Concise Summary:`,
  });
