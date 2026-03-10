import { baseApi } from "../baseApi";

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => "users/my-profile",
            providesTags: ["profile"],
        }),
    }),
});

export const {
    useGetProfileQuery,
} = profileApi;
