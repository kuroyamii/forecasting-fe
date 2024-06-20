import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import DashboardHeading from "../typography/dashboardHeading";
import DashboardImportantText from "../typography/dashboardImportantText";

const TotalProductSection = ({ totalProduct }: { totalProduct: any }) => {
  return (
    <VStack align={"left"} justifyContent={"center"} height="full">
      <DashboardHeading>Total Product</DashboardHeading>
      <HStack align="end">
        <DashboardImportantText>
          {totalProduct
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
        </DashboardImportantText>
        <Text fontSize={"1.5rem"} color={"gray.400"} fontWeight={"medium"}>
          Products
        </Text>
      </HStack>
    </VStack>
  );
};

export default TotalProductSection;
