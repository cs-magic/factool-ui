import Head from "next/head";

import { api } from "~/utils/api";
import React, { useState } from "react";
import { FactoolMainTable } from "~/components/factool-main";
import Link from "next/link";
import { Label } from "~/components/ui/label";

/**
 * ref: https://dev.to/gugaguichard/replace-clsx-classnames-or-classcat-with-your-own-little-helper-3bf#comment-26077
 */
export function cn(
  ...args: Array<undefined | null | string | boolean>
): string {
  return args
    .flat()
    .filter((x) => typeof x === "string")
    .join(" ");
}

export default function Home() {
  const [pageNum, setPageNum] = useState(1);
  const { data: facts } = api.factool.getAll.useQuery({
    pageNum,
    pageSize: 1000,
  });
  console.log({ facts });

  return (
    <>
      <Head>
        <title>大模型评测</title>
        <meta name="description" content="大模型评测" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={cn(
          "flex min-h-screen flex-col items-center justify-start bg-gradient-to-b ",
          // "from-[#2e026d] to-[#15162c]"
        )}
      >
        <div className="container flex flex-col items-center  gap-12 px-4 py-16 ">
          <h1
            className={cn(
              "text-4xl font-extrabold tracking-tight sm:text-[5rem]",
              // "text-white"
            )}
          >
            大模型评测
          </h1>

          <p>点击第一列的省略号可以展开显示各家大模型的回答</p>

          <FactoolMainTable data={facts ?? []} />

          <div className={"grow"} />
        </div>

        <div className={"flex flex-col gap-2"}>
          <div className={"inline-flex items-center gap-2"}>
            <Label>Data Open Source:</Label>
            <Link
              href={"https://gair-nlp.github.io/ChineseFactEval"}
              className={"underline underline-offset-4 hover:text-blue-500"}
            >
              ChineseFactEval
            </Link>
          </div>

          <div className={"inline-flex items-center gap-2"}>
            <Label>UI Open Source:</Label>
            <Link
              href={"https://github.com/cs-magic/factool-ui"}
              className={"underline underline-offset-4 hover:text-blue-500"}
            >
              factool-ui
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
