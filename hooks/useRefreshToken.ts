import { baseAPI } from "@/service/api/baseAPI";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const response = await baseAPI.post("/token/refresh", null, {
        withCredentials: true,
      });
      return response.data.data.access_token;
    } catch (error) {
      throw error;
    }
  };
  return refresh;
};

export default useRefreshToken;
