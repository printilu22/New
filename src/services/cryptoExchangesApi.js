import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoExchangesApi = createApi({
  reducerPath: 'cryptoExchangesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => '/exchanges?per_page=100',
      transformResponse: (response) => {
        if (!response) {
          throw new Error('No data received from API');
        }
        return response;
      },
    }),
  }),
});

export const { useGetExchangesQuery } = cryptoExchangesApi; 