import { ReactNode } from "react";
import AuthGuard from "./components/auth-guard";
import {
  createBrowserRouter,
  IndexRouteObject,
  Navigate,
  NonIndexRouteObject,
} from "react-router-dom";
import { ErrorPage } from "../pages/Error.page";
import DashboardLayout from "../layouts/dashboard";
import Page404 from "../pages/Error/Page404";

type PageProps = {
  component: ReactNode;
};

export type NavbarFields = {
  navLabel?: string;
  navPath?: string;
  icon?: ReactNode;
  subheader?: string;
  title?: string;
  showInNav?: boolean; // New field to control visibility in nav
};

// eslint-disable-next-line react-refresh/only-export-components
const PageWrapper = ({ component }: PageProps) => {
  return <AuthGuard>{component}</AuthGuard>;
};

export type RouteObjectWithNavbar =
  | (IndexRouteObject & NavbarFields)
  | (Omit<NonIndexRouteObject, "children"> & {
      children?: RouteObjectWithNavbar[];
    } & NavbarFields);

export const RouteObjectWithNavbar: RouteObjectWithNavbar[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Navigate to="/dashboard" replace />,
        index: true,
        showInNav: false,
      },
    ],
  },
  {
    path: "/adminPanel",
    element: <PageWrapper component={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    showInNav: true,
    children: [
      {
        caseSensitive: false,
        index: true,
        path: "/adminPanel",
        lazy: async () => {
          const { Workbench } = await import("../pages/dashboard/workbench");
          return { element: <PageWrapper component={<Workbench />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/adminPanel",
        navLabel: "Admin Panel",
        title: "Admin Panel",
        subheader: "Admin Panel",
        showInNav: true,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PageWrapper component={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    showInNav: true,
    children: [
      {
        caseSensitive: false,
        index: true,
        path: "/dashboard",
        lazy: async () => {
          const { Home } = await import("../pages/home/Home.page");
          return { element: <PageWrapper component={<Home />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/dashboard",
        navLabel: "Dashboard",
        title: "Dashboard",
        subheader: "Dashboard",
        showInNav: true,
      },
    ],
  },
  {
    path: "/user",
    element: <PageWrapper component={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    showInNav: true,
    children: [
      {
        caseSensitive: false,
        index: true,
        path: "/user/profile",
        lazy: async () => {
          const { UserPage } = await import("../pages/user/User.Profile");
          return { element: <PageWrapper component={<UserPage />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/user/profile",
        navLabel: "User profile",
        title: "User profile",
        subheader: "User profile",
        showInNav: false,
      },
    ],
  },
  {
    path: "/success-stories",
    element: <PageWrapper component={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    showInNav: true,
    children: [
      {
        caseSensitive: false,
        index: true,
        path: "/success-stories/add",
        lazy: async () => {
          const { AddSuccessStory } = await import(
            "../pages/SuccessStories/addSuccessStory.Page"
          );
          return { element: <PageWrapper component={<AddSuccessStory />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/success-stories/add",
        navLabel: "Add Success Story",
        title: "Add Success Story",
        subheader: "Add Success Story",
        showInNav: true,
      },
      {
        caseSensitive: false,
        index: true,
        path: "/success-stories/view",
        lazy: async () => {
          const { FullSuccessStory } = await import(
            "../pages/SuccessStories/FullSuccessStory.Page"
          );
          return { element: <PageWrapper component={<FullSuccessStory />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/success-stories/view",
        navLabel: "View Success Story",
        title: "View Success Story",
        subheader: "View Success Story",
        showInNav: true,
      },
      {
        caseSensitive: false,
        index: true,
        path: "/success-stories/all",
        lazy: async () => {
          const { SuccessStories } = await import(
            "../pages/SuccessStories/successStoryList.Page"
          );
          return { element: <PageWrapper component={<SuccessStories />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/success-stories/all",
        navLabel: "View all Success Story",
        title: "View all Success Story",
        subheader: "View all Success Story",
        showInNav: true,
      },
    ],
  },
  {
    path: "/networking",
    element: <PageWrapper component={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    showInNav: true,
    children: [
      {
        caseSensitive: false,
        index: true,
        path: "/networking/home",
        lazy: async () => {
          const { NetworkingHome } = await import(
            "../pages/Netwotking/NetworkingHome.Page"
          );
          return { element: <PageWrapper component={<NetworkingHome />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/networking/home",
        navLabel: "Networking Home",
        title: "Networking Home",
        subheader: "/networking/home",
        showInNav: true,
      },
    ],
  },
  {
    path: "/event",
    element: <PageWrapper component={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    showInNav: true,
    children: [
      {
        caseSensitive: false,
        index: true,
        path: "/event/create",
        lazy: async () => {
          const { EventCreation } = await import(
            "../pages/event/EventCreate.Page"
          );
          return { element: <PageWrapper component={<EventCreation />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/event/create",
        navLabel: "Create Event",
        title: "Create Event",
        subheader: "Create Event",
        showInNav: true,
      },
      {
        caseSensitive: false,
        index: true,
        path: "/event/public/:id",
        lazy: async () => {
          const { EventDetails } = await import(
            "../pages/event/EventPublic.Link"
          );
          return { element: <PageWrapper component={<EventDetails />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/event/public",
        navLabel: "Public Event",
        title: "Public Event",
        subheader: "Public Event",
        showInNav: true,
      },
      {
        caseSensitive: false,
        index: true,
        path: "/event/register/:id",
        lazy: async () => {
          const { EventRegistration } = await import(
            "../pages/event/EventRegister.Page"
          );
          return { element: <PageWrapper component={<EventRegistration />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/event/register",
        navLabel: "Register Event",
        title: "Event Registration",
        subheader: "Event Registration",
        showInNav: true,
      },
      {
        caseSensitive: false,
        index: true,
        path: "/event/list",
        lazy: async () => {
          const { EventsList } = await import("../pages/event/EventList");
          return { element: <PageWrapper component={<EventsList />} /> };
        },
        icon: "ph:chart-pie-slice-duotone",
        navPath: "/event/list",
        navLabel: "Event List",
        title: "Event List",
        subheader: "Event List",
        showInNav: true,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    children: [
      {
        caseSensitive: false,
        index: true,
        path: "/auth/login",
        lazy: async () => {
          const { Login } = await import("../pages/auth/Login.page");
          return { element: <Login /> };
        },
        navPath: "/auth/login",
        navLabel: "Login",
        title: "Login",
        subheader: "Login",
        showInNav: false,
      },
      {
        caseSensitive: false,
        index: true,
        path: "/auth/register",
        lazy: async () => {
          const { Register } = await import("../pages/auth/Register.page");
          return { element: <Register /> };
        },
        navPath: "/auth/register",
        navLabel: "Register",
        title: "Register",
        subheader: "Register",
        showInNav: false,
      },
      {
        caseSensitive: false,
        index: true,
        path: "/auth/success",
        lazy: async () => {
          const { AuthSuccess } = await import("../pages/auth/Success.page");
          return { element: <AuthSuccess /> };
        },
        navPath: "/auth/success",
        navLabel: "Login Sucess",
        title: "Login Sucess",
        subheader: "Login Sucess",
        showInNav: false,
      },
    ],
  },
  {
    path: "/*",
    element: <Page404 />,
    children: [],
    showInNav: false,
  },
];

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(RouteObjectWithNavbar);
