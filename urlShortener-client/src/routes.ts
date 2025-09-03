import { createBrowserRouter } from "react-router";
import { App } from ".";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/something",
    Component: App
  },
  {
    path: "*",
    Component: NotFound
  },
]);
