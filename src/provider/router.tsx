import { createBrowserRouter } from "react-router";
import Login from "../pages/Auth/Login";
import MainLayout from "../layouts/MainLayout";
import UserLayout from "../layouts/UserLayout";
import Inbox from "../pages/User/Inbox";
import Error from "../components/Error";
import ViewEmail from "../components/user/ViewEmail";
import ComposeEmail from "../components/user/ComposeEmail";
import Settings from "../components/settings/Settings";
import AdminLayout from "../layouts/AdminLayout";
import AdminDAshboard from "../pages/Admin/AdminDashboard/AdminDAshboard";
import BusinessInfo from "../pages/Admin/BusinessInfo/BusinessInfo";
import UserManagement from "../components/Admin/UserManagement/UserManagement";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <Error />,
        children: [
            { index: true, Component: Login },
        ]
    },
    //user layout routes
    {
        path: "/user",
        Component: UserLayout,
        errorElement: <Error />,
        children: [
            { index: true, Component: Inbox },
            { path: "view-email/:id", Component: ViewEmail },
            {path:"compose",Component:ComposeEmail},
            {path:"settings",Component:Settings}
           
        ]
    },
    // admin layout routes
    {
        path: "/admin",
        Component: AdminLayout,
        errorElement: <Error />,
        children: [
            { index: true, Component: AdminDAshboard },
            {path:"business-info",Component:BusinessInfo},
            {path:"user-management",Component:UserManagement},
        ]
    }

])