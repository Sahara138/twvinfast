import type { GetUserResponse, UserFormData } from "../../../../types/Admin/UserManagement";
import { baseAPI } from "../../../baseAPI/baseApi";

const userApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getUserByBusiness: build.query<GetUserResponse[], number>({
            query: (businessId: number) => ({
                url: `/admin/users/business/${businessId}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }), 
        
        createUser: build.mutation<void, UserFormData>({
            query: (userData) => ({
                url: '/auth/employee',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});
export const { 
    useGetUserByBusinessQuery,
    useCreateUserMutation,
} = userApi;


