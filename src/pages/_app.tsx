import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
};

export default api.withTRPC(MyApp);
