import { createBrowserRouter } from "react-router";
import Login from "../pages/Auth/Login";
import MainLayout from "../layouts/MainLayout";
import UserLayout from "../layouts/UserLayout";
import Inbox from "../pages/User/Inbox";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, Component: Login },
        ]
    },
    //user layout routes

    {
        path: "/user",
        Component: UserLayout,
        children: [
            { index: true, Component: Inbox },
        ]
    }

])