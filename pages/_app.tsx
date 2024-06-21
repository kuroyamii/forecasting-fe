import "../styles/globals.css";
import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import CustomChakraProvider from "@/providers/ChakraCustomProviders";
import TanstackQueryProvider from "@/providers/tanstackQueryProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomChakraProvider>
      <TanstackQueryProvider>
        <Component {...pageProps} />
      </TanstackQueryProvider>
    </CustomChakraProvider>
  );
}

export default MyApp;
