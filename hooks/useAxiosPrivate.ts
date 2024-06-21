import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import privateAPI from "@/service/api/privateAPI";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = privateAPI.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          let accessToken = localStorage.getItem("at");
          if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = privateAPI.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return error;
      }
    );
    return () => {
      privateAPI.interceptors.request.eject(requestIntercept);
      privateAPI.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);
  return privateAPI;
};

export default useAxiosPrivate;
