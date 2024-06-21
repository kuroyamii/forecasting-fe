import axios from "axios";
import { baseAPI } from "./baseAPI";

const privateAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ADDRESS,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default privateAPI;
