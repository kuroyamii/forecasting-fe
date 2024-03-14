import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import authAPI from "@/service/api/authAPI";
import config from "@/service/config/config";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  function refreshTokens() {
    // Refresh token
    const rt: any = localStorage.getItem("rt");
    const at: any = localStorage.getItem("at");
    if (!rt && !at) {
      router.push("/auth/login");
    }
    if (rt) {
      let refreshToken = jwtDecode(rt);
      if (refreshToken.exp) {
        let expDate = new Date(refreshToken.exp * 1000);
        let exp = Date.parse(expDate.toISOString());
        let now = Date.now();
        if (exp - now > 0) {
          (async () => {
            const res = await authAPI.refreshToken(rt);
            if (res.data) {
              localStorage.setItem("at", res.data.access_token);
              localStorage.setItem("rt", res.data.refresh_token);
            }
          })();
        } else {
          localStorage.removeItem("at");
          localStorage.removeItem("rt");
          router.push("/auth/login");
        }
      }
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
