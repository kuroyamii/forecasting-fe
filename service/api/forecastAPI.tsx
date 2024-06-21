import { AxiosInstance } from "axios";

async function forecastSales(
  month: number,
  year: number,
  sub_category_id: number,
  privateAPI: AxiosInstance
) {
  try {
    const res = await privateAPI.post(
      "/forecast",
      JSON.stringify({
        sub_category_id: sub_category_id,
        month: month,
        year: year,
      })
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

async function getSubCategories(privateAPI: AxiosInstance) {
  try {
    const res: any = await privateAPI.get("/sub-categories");

    return res.data;
  } catch (error) {
    throw error;
  }
}

export default {
  forecastSales,
  getSubCategories,
};
