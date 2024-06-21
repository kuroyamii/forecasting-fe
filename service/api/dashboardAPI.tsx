import { AxiosInstance } from "axios";

async function getSalesGrowth(month: number, axiosPrivate: AxiosInstance) {
  try {
    const res: any = await axiosPrivate.get(`/sales-growth?month=${month}`, {});
    return res;
  } catch (error) {
    throw error;
  }
}

async function getTotalProduct(axiosPrivate: AxiosInstance) {
  try {
    const res: any = await axiosPrivate.get("/total-product", {});
    return res.data;
  } catch (error) {
    throw error;
  }
}

async function getTopCategory(axiosPrivate: AxiosInstance) {
  try {
    const res: any = await axiosPrivate.get("/most-bought-category");
    return res.data;
  } catch (error) {
    throw error;
  }
}

async function getTopTransaction(limit: number, axiosPrivate: AxiosInstance) {
  try {
    const res: any = await axiosPrivate.get(`/top-transactions?limit=${limit}`);
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
