import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";


 const baseQueryAPI = fetchBaseQuery({
  //  baseUrl:'https://persons-proletarianly-todd.ngrok-free.dev',
   baseUrl:'http://localhost:3000',
   credentials: "include",
   prepareHeaders: (headers, {getState}) => {
     const token = (getState() as RootState).auth?.accessToken;
     if (token) {
       headers.set("Authorization", `Bearer ${token}`);
     }
     return headers;
   },
 });

 export const baseAPI = createApi({
   reducerPath: "baseAPI",
   baseQuery: baseQueryAPI,
   tagTypes: ["Auth", "User","Label","Mailbox","Thread", "Email", "Customer", "Analytics"],
   endpoints: () => ({}),
 });
 



 