import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";

const extendedTheme = extendTheme({
  extendTheme: {
    breakpoints: {
      "3xl": "1220px",
    },
  },
});

const ChakraCustomProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider children={children} theme={extendedTheme} />;
};

export default ChakraCustomProvider;
