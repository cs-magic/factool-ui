import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import factool from "~/server/datasets/chinese/dataset_chinese.jsonl";

export interface IFactoolResponse {
  model_name: string; // enum
  response: string;
  factuality: boolean;
}
export interface IFactool {
  category: string; // enum
  prompt: string;
  responses_and_factuality: IFactoolResponse[];
  weight: number;
}

export const factoolRouter = createTRPCRouter({
  getAll: publicProcedure.query<IFactool[]>(async ({ ctx }) => {
    // const lines  = readJsonl(await jsonl.readlines<IFactool>(factoolData), 0, 5)
    // const data = await readJsonl(
    //   path.join(__dirname, "../../datasets/chinese/dataset_chinese.jsonl"),
    // );
    // 1 as the start, see: https://github.com/dcwarwick/jsonlines-loader#jsonlines-loader
    return factool.slice(1, 5);
  }),
});
