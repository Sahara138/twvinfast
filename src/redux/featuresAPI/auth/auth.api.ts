import { baseAPI } from "../../baseAPI/baseApi";

export const userAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: ({ email, password }: { email: string; password: string }) => ({
                url: '/auth/login',
                method: 'POST',
                body: { email, password },
            }),
            // invalidatesTags: ['Auth'],
        }),
        register: build.mutation({
            query: (credentials: any) => ({
                url: '/auth/admin-signup',
                method: 'POST',
                body: credentials,
            }),
            // invalidatesTags: ['Auth'],
        }),
        
    }),
    // overrideExisting: false,
});

export const { 
    useLoginMutation, 
    useRegisterMutation 
} = userAPI;
