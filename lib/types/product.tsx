export type ProductResponseType = {
  id: string;
  product_name: string;
  sub_category: string;
  category: string;
  total_sales: number;
};

export type TransactionType = {
  customer_id: string;
  order_date: string;
  product_name: string;
  sales: number;
};
