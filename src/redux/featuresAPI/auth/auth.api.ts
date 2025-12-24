import { baseAPI } from "../../baseAPI/baseApi";
import type { ChangePasswordPayload, ChangePasswordResponse, NotificationPayload, NotificationResponse, TUser, UpdateCredentialsPayload, UpdateCredentialsResponse, UpdateUserProfilePayload } from "../../user.type";

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
        getUsersProfile: build.query<TUser, void>({
              query: () => ({
                url: "/users/me",
                method: "GET",
              }),
              providesTags: ["User"],
        }),
        updateUsersProfile: build.mutation<
            any,
            UpdateUserProfilePayload
            >({
            query: (body) => ({
                url: '/users/me/profile',
                method: 'PATCH',
                body,
            }),
            }),

        changePassword: build.mutation<
            ChangePasswordResponse,
            ChangePasswordPayload
            >({
            query: (body) => ({
                url: "/auth/change-password",
                method: "POST",
                body,
            }),
        }),
        updateNotification: build.mutation<
            NotificationResponse,
            NotificationPayload
            >({
            query: (body) => ({
                url: "/auth/notification",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
            }),
        updateCredentials: build.mutation<
            UpdateCredentialsResponse,
            UpdateCredentialsPayload
            >({
            query: (body) => ({
                url: "/users/me/mailbox",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["User"],
            }),
    }),
    // overrideExisting: false,
});

export const { 
    useLoginMutation, 
    useRegisterMutation,
    useGetUsersProfileQuery,
    useUpdateUsersProfileMutation, 
    useChangePasswordMutation,
    useUpdateNotificationMutation,
    useUpdateCredentialsMutation
} = userAPI;
