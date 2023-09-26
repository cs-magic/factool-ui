import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import factool from "~/server/datasets/chinese/dataset_chinese.jsonl";
import { IFactool } from "~/ds";

export const factoolRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        pageSize: z.number().default(5),
        pageNum: z.number().default(1),
      }),
    )
    .query<IFactool[]>(async ({ ctx, input: { pageNum, pageSize } }) => {
      const start =
        (pageNum - 1) * pageSize +
        // jsonl 这个包，第一条是null
        1;
      const end = start + pageSize;
      return factool.slice(start, end);
    }),
});
