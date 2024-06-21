import { baseAPI } from "./baseAPI";
import qs from "qs";
async function getProductSummaries(
  page: string,
  limit: string,
  access_token: string
) {
  const queryString = qs.stringify({ limit, page });
  try {
    const res = await baseAPI(`/product-summaries?${queryString}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default {
  getProductSummaries,
};
