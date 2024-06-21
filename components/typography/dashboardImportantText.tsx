import { Heading } from "@chakra-ui/react";
import React from "react";

const DashboardImportantText = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Heading size={{ "2xl": "2xl", base: "lg", lg: "xl" }} mt="1rem">
      {children}
    </Heading>
  );
};

export default DashboardImportantText;
