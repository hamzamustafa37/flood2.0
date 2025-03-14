import { apiRoutes, getBaseUrl, type IResponse } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

export const floodApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api${apiRoutes.rebuttal.name}`,
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "FloodApi",
  tagTypes: ["Flood"],
  endpoints: (build) => ({
    getFlood: build.query<IResponse, { page: number; limit: number }>({
      query: ({ page = 1, limit = 10 }) => `?page=${page}&limit=${limit}`,
      transformResponse: (response: IResponse) => response,
      providesTags: (result, error, { page, limit }) => [
        { type: "Flood", limit, page, error },
      ],
    }),
  }),
});

export const { useGetFloodQuery } = floodApiSlice;
