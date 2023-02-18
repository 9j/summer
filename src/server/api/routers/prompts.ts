import { TRPCError } from "@trpc/server";
import { encode } from "gpt-3-encoder";
import { z } from "zod";
import { excuteCreateCompletion } from "../../../libs/openai";
import { SERVER_PREDICTION_PROMPTS } from "../../../libs/prompts";

import { createTRPCRouter, publicProcedure } from "../trpc";

const MAXIMUM_TOKEN_LENGTH = 4097;
export const MAX_TOKENS = 700;
const MAXIMUM_PROMPT_LENGTH = MAXIMUM_TOKEN_LENGTH - MAX_TOKENS;

export const promptsRouter = createTRPCRouter({
  excute: publicProcedure
    .input(z.object({ text: z.string(), id: z.string() }))
    .mutation(async ({ input }) => {
      const prompt = SERVER_PREDICTION_PROMPTS.find(
        (prompt) => prompt.id === input.id
      );
      if (!prompt) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "올바르지 않은 프롬프트입니다.",
        });
      }
      const promptText = prompt.template({ input: input.text });
      const promptLength = encode(promptText).length;
      if (promptLength > MAXIMUM_PROMPT_LENGTH) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "텍스트가 너무 길어요! 조금만 줄여주세요.",
        });
      }
      try {
        const result = await excuteCreateCompletion({
          prompt: promptText,
          temperature: prompt.temperature,
        });
        return {
          text: result.data.choices[0]?.text,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OPENAI 서버에 문제가 생겼어요. 잠시 후 다시 시도해주세요.",
        });
      }
    }),
});
