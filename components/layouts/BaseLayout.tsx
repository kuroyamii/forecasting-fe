import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { useRouter } from "next/router";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Flex flexDirection={"row"} maxWidth="100vw" backgroundColor="gray.50">
      <Sidebar />
      <Box p="16" width="full">
        <Breadcrumbs
          paths={router.pathname.split("/").filter((element) => element !== "")}
        />
        {children}
      </Box>
    </Flex>
  );
};

export default BaseLayout;
