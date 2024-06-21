import { AxiosInstance } from "axios";
import qs from "qs";
async function getProductSummaries(
  page: string,
  limit: string,
  privateAPI: AxiosInstance
) {
  const queryString = qs.stringify({ limit, page });
  try {
    const res = await privateAPI(`/product-summaries?${queryString}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export default {
  getProductSummaries,
};
