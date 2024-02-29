import "../styles/globals.css";
import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import CustomChakraProvider from "@/providers/ChakraCustomProviders";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomChakraProvider>
      <Component {...pageProps} />
    </CustomChakraProvider>
  );
}

export default MyApp;
