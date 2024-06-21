import { baseAPI } from "./baseAPI";

async function forecastSales(
  month: number,
  year: number,
  sub_category_id: number,
  access_token: string
) {
  try {
    const res = await baseAPI.post(
      "/forecast",
      JSON.stringify({
        sub_category_id: sub_category_id,
        month: month,
        year: year,
      }),
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

async function getSubCategories(access_token: string) {
  try {
    const res: any = await baseAPI.get("/sub-categories", {
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
  forecastSales,
  getSubCategories,
};
