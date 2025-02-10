import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  authorization: `Apikey ${process.env.REACT_APP_CRYPTOCOMPARE_API_KEY}`,
};

const baseUrl = 'https://min-api.cryptocompare.com/data/v2';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ count }) => createRequest(`/news/?lang=EN&sortOrder=popular&limit=${count}`),
      transformResponse: (response) => ({
        value: response.Data.map((article) => ({
          url: article.url,
          name: article.title,
          description: article.body,
          datePublished: article.published_on * 1000, // Convert to milliseconds
          image: {
            thumbnail: {
              contentUrl: article.imageurl,
            },
          },
          provider: [
            {
              name: article.source,
              image: {
                thumbnail: {
                  contentUrl: article.source_info?.img,
                },
              },
            },
          ],
        })),
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;