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
    getScriptureById: builder.query({
      query: (scriptureId) => ({
        url: `scriptures/${scriptureId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "scriptures", id }],
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
    getRecentScriptures: builder.query({
      query: (params) => ({
        url: "scriptures/recent",
        method: "GET",
        params,
      }),
      providesTags: ["scriptures"],
    }),
    getScriptureStats: builder.query({
      query: (params) => ({
        url: "scriptures/stats",
        method: "GET",
        params,
      }),
      providesTags: ["scriptures"],
    }),
  }),
});

export const {
  useDeleteScripturesMutation,
  useGetAllScripturesQuery,
  useGetScriptureByIdQuery,
  useCreateScripturesMutation,
  useUpdateScripturesMutation,
  useGetRecentScripturesQuery,
  useGetScriptureStatsQuery,
} = scripturesApi;
