import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = '403eb2d29cf1f8707b3f15eb5111dbb75a80b49c';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://min-api.cryptocompare.com',
    prepareHeaders: (headers) => {
      headers.set('authorization', `Apikey ${API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ count }) => ({
        url: '/data/v2/news/',
        method: 'GET',
        params: {
          lang: 'EN',
          limit: count
        }
      }),
      transformResponse: (response) => {
        // Check if we have a valid response
        if (response && Array.isArray(response.Data)) {
          return {
            data: {
              Data: response.Data.map(article => ({
                ...article,
                url: article.url,
                title: article.title,
                body: article.body,
                imageurl: article.imageurl,
                source_info: {
                  name: article.source,
                  img: article.source_info?.img
                },
                published_on: article.published_on
              }))
            }
          };
        }
        return { data: { Data: [] } };
      },
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
