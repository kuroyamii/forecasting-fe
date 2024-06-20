import { Heading, VStack } from "@chakra-ui/react";
import React from "react";
import DashboardHeading from "../typography/dashboardHeading";
import DashboardImportantText from "../typography/dashboardImportantText";

const TopCategorySection = ({ topCategory }: { topCategory: any }) => {
  return (
    <VStack align={"left"} justifyContent={"center"} height="full">
      <DashboardHeading>Top Category</DashboardHeading>
      <DashboardImportantText>{topCategory}</DashboardImportantText>
    </VStack>
  );
};

export default TopCategorySection;
