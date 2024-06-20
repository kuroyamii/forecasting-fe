import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const TotalProductSection = ({ totalProduct }: { totalProduct: any }) => {
  return (
    <VStack align={"left"} justifyContent={"center"} height="full">
      <Heading size={"lg"} color={"blue.900"}>
        Total Product
      </Heading>
      <HStack align="end">
        <Heading size={"3xl"} mt="1rem">
          {totalProduct
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}
        </Heading>
        <Text fontSize={"1.5rem"} color={"gray.400"} fontWeight={"medium"}>
          Products
        </Text>
      </HStack>
    </VStack>
  );
};

export default TotalProductSection;
