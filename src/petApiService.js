import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  //! The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    //! The `getPet` endpoint is a "query" operation that returns data
    getPet: builder.query({
      // ! The URL for the request is '/api/posts'
      query: (id) => ({ url: "pets", params: { id } }),
      transformResponse: (response) => response.pets[0],
    }),

    // get breeds function
    getBreeds: builder.query({
      query: (animal) => ({ url: "breeds", params: { animal } }),
      transformResponse: (response) => response.breeds,
    }),

    // Search function
    search: builder.query({
      query: ({ animal, location, breed }) => ({
        url: "pets",
        params: { animal, location, breed },
      }),
      transformResponse: (response) => response.pets,
    }),
  }),
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
