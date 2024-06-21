import { baseAPI } from "./baseAPI";

async function getSalesGrowth(month: number, access_token: string) {
  try {
    const res: any = await baseAPI.get(`/sales-growth?month=${month}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function getTotalProduct(access_token: string) {
  try {
    const res: any = await baseAPI.get("/total-product", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

async function getTopCategory(access_token: string) {
  try {
    const res: any = await baseAPI.get("/most-bought-category", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {}
}

async function getTopTransaction(limit: number, access_token: string) {
  try {
    const res: any = await baseAPI.get(`/top-transactions?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default {
  getSalesGrowth,
  getTotalProduct,
  getTopCategory,
  getTopTransaction,
};
