import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { VITE_API_URL } from "../../constants"; // Используем переменную из constants
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${VITE_API_URL}/api`, 
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token || localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Настроим повторные попытки для запросов
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
