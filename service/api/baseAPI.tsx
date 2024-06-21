import axios, { CreateAxiosDefaults } from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const axiosConfig: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_ADDRESS,
  headers: {
    "Content-Type": "application/json",
  },
};
export const baseAPI = axios.create(axiosConfig);
