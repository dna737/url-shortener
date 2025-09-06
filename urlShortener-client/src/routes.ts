import { createBrowserRouter } from "react-router";
import { App } from ".";
import { NotFound, UrlRedirect } from "./components";

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
