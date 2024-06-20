import { Heading } from "@chakra-ui/react";
import React from "react";

const DashboardHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading fontSize={{ "2xl": "2rem", base: "1.5rem" }} color={"blue.900"}>
      {children}
    </Heading>
  );
};

export default DashboardHeading;
