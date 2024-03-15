import { baseAPI } from "./baseAPI";

async function forecastSales(
  month: number,
  year: number,
  sub_category_id: number,
  discount: number,
  access_token: string
) {
  try {
    const res = await baseAPI.post(
      "/forecast",
      JSON.stringify({
        sub_category_id: sub_category_id,
        discount: discount,
        month: month,
        year: year,
      }),
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return res.data;
  } catch (error) {
    return error;
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
    return error;
  }
}

export default {
  forecastSales,
  getSubCategories,
};
