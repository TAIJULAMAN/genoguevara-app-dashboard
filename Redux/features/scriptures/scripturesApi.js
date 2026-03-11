import { baseApi } from "../baseApi";

export const scripturesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllScriptures: builder.query({
      query: (params) => ({
        url: "scriptures",
        method: "GET",
        params,
      }),
      providesTags: ["scriptures"],
    }),
    deleteScriptures: builder.mutation({
      query: (scriptureId) => ({
        url: `scriptures/${scriptureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["scriptures"],
    }),
    createScriptures: builder.mutation({
      query: (data) => ({
        url: "scriptures",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["scriptures"],
    }),
    updateScriptures: builder.mutation({
      query: ({ scriptureId, data }) => ({
        url: `scriptures/${scriptureId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["scriptures"],
    }),
  }),
});

export const {
  useDeleteScripturesMutation,
  useGetAllScripturesQuery,
  useCreateScripturesMutation,
  useUpdateScripturesMutation,
} = scripturesApi;
