import { Heading, VStack } from "@chakra-ui/react";
import React from "react";

const TopCategorySection = ({ topCategory }: { topCategory: any }) => {
  return (
    <VStack align={"left"} justifyContent={"center"} height="full">
      <Heading size={"lg"} color={"blue.900"}>
        Top Category
      </Heading>
      <Heading size="2xl" mt="1rem">
        {topCategory}
      </Heading>
    </VStack>
  );
};

export default TopCategorySection;
