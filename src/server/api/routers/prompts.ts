import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { excuteCreateCompletion } from "../../../libs/openai";
import { SERVER_PREDICTION_PROMPTS } from "../../../libs/prompts";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const promptsRouter = createTRPCRouter({
  excute: publicProcedure
    .input(z.object({ text: z.string(), id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const prompt = SERVER_PREDICTION_PROMPTS.find(
          (prompt) => prompt.id === input.id
        );
        if (!prompt) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid prompt id",
          });
        }
        const result = await excuteCreateCompletion({
          prompt: prompt.template({ input: input.text }),
          temperature: prompt.temperature,
        });
        return {
          text: result.data.choices[0]?.text,
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (
            error as {
              response: {
                data: {
                  error: {
                    message: string;
                  };
                };
              };
            }
          ).response.data.error.message,
        });
      }
    }),
});
