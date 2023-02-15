import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { shortSummary } from "../../../libs/openai";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const promptsRouter = createTRPCRouter({
  shortSummary: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const summary = await shortSummary(input.text);
        console.log("🚀 ~ file: prompts.ts:11 ~ .mutation ~ summary", summary);
        console.log(summary.data.choices);
        return {
          summary: summary.data.choices[0]?.text,
        };
      } catch (error) {
        console.log(error);

        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
});
