import { baseApi } from "../baseApi";

const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => ({
        url: "common/about",
        method: "GET",
      }),
      providesTags: ["aboutUs"],
    }),

    updateAboutUs: builder.mutation({
      query: ({ about }) => ({
        url: "legalDoc/create-doc/aboutUs",
        method: "PATCH",
        body: { about },
      }),
      invalidatesTags: ["aboutUs"],
    }),
  }),
});

export const { useGetAboutUsQuery, useCreateAboutUsMutation } = aboutUsApi;
