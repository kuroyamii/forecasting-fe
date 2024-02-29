import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";

const extendedTheme = extendTheme({});

const ChakraCustomProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider children={children} theme={extendedTheme} />;
};

export default ChakraCustomProvider;
