import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import authAPI from "@/service/api/authAPI";
import config from "@/service/config/config";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  function refreshTokens() {
    // Refresh token

    const at: any = localStorage.getItem("at");
    if (!at) {
      router.push("/auth/login");
    }
  }

  useEffect(() => {
    refreshTokens();
    const interval = setInterval(refreshTokens, config.refreshDuration);
    return () => {
      clearInterval(interval);
    };
  });
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
