import { baseAPI } from "./baseAPI";

async function forecastSales(
  month: number,
  year: number,
  product_id: number,
  access_token: string
) {
  try {
    const res = await baseAPI.post(
      "/forecast",
      JSON.stringify({
        product_id: product_id,
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

async function getProducts(access_token: string) {
  try {
    const res: any = await baseAPI.get("/products", {
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
  getProducts,
};
