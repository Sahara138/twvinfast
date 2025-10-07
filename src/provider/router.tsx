import { createBrowserRouter } from "react-router";
import Login from "../pages/Auth/Login";
import MainLayout from "../layouts/MainLayout";
import UserLayout from "../layouts/UserLayout";
import Inbox from "../pages/User/Inbox";
import Error from "../components/Error";

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
        ]
    }

])