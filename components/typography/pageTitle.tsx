import { Heading, HeadingProps } from "@chakra-ui/react";
import React from "react";

const PageTitle = ({
  children,
  mb,
  mt,
}: {
  children: React.ReactNode;
  mb?: string | number;
  mt?: string | number;
}) => {
  return (
    <Heading size={"2xl"} color={"blue.900"} mt={mt ? mt : 4} mb={mb ? mb : 8}>
      {children}
    </Heading>
  );
};

export default PageTitle;
