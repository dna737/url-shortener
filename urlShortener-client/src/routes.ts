import { createBrowserRouter } from "react-router";
import { App } from ".";
import NotFound from "./components/NotFound";
import UrlRedirect from "./components/UrlRedirect";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App
  },
  {
    path: "/:url",
    Component: UrlRedirect
  },
  {
    path: "*",
    Component: NotFound
  },
]);
