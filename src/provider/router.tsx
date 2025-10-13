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
import AILearning from "../pages/Admin/AILearning/AILearning";
import Customers from "../pages/Admin/Customer/Customers";
import CustomerViewEmail from "../components/Admin/Customer/CustomerViewEmail";
import Analytics from "../pages/Admin/Analytics/Analytics";
import AdminSettings from "../pages/Admin/AdminSettings/AdminSettings";
import Starred from "../pages/User/Starred";
import Archive from "../pages/User/Archive";
import Trash from "../pages/User/Trash";
import Integrations from "../pages/Admin/Integrations/Integrations";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdminDashboard/SuperAdminDashboard";
import CustomerManagement from "../pages/SuperAdmin/CustomerManagement/CustomerManagement";
import SuperUserManagement from "../pages/SuperAdmin/UserManagement/SuperUserManagement";
import FollowUp from "../pages/User/FollowUp";
import Drafts from "../pages/User/Drafts";
import Urgent from "../pages/User/Urgent";
import General from "../pages/User/General";
import AIModelManagement from "../pages/SuperAdmin/AIModelManagement/AIModelManagement.tsx";
import BusinessControl from "../pages/SuperAdmin/BusinessControl/BusinessControl.tsx";
import BillingSubscription from "../pages/SuperAdmin/BillingSubscription/BillingSubscription.tsx";
import PlatformSettings from "../pages/SuperAdmin/PlatfromSettings/PlatformSettings.tsx";
import AnalyticsReports from "../pages/SuperAdmin/AnalyticsReports/AnalyticsReports.tsx";

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
            {path:"starred",Component:Starred},
            {path:"archive",Component:Archive},
            {path:"trash",Component:Trash},
            {path:"follow-up",Component:FollowUp},
            {path:"drafts",Component:Drafts},
            {path:"urgent",Component:Urgent},
            {path:"general",Component:General},
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
            {path:"ai-learning",Component:AILearning},
            {path:"customers",Component:Customers},
            {path:"customers/view-email/:id",Component:CustomerViewEmail},
            {path:"analytics",Component:Analytics},
            {path:"integrations",Component:Integrations},
            {path:"admin-settings",Component:AdminSettings}
        ]
    },
    //super admin layout routes
    {
        path: "/super-admin",
        Component: SuperAdminLayout,
        errorElement: <Error />,
        children: [
            {index: true, Component: SuperAdminDashboard },
            {path:"customer-management",Component:CustomerManagement},
            {path:"user-management",Component:SuperUserManagement},
            {path:"ai-model-management",Component:AIModelManagement},
            {path:"business-control",Component:BusinessControl},
            {path:"billing-subscription",Component:BillingSubscription},
            {path:"platfrom-settings",Component:PlatformSettings},
            {path:"analytics-reports",Component:AnalyticsReports}        ]
    }

])