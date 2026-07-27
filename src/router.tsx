import { type RouteObject } from "react-router-dom";

// ? Components
import { RootLayout } from "./layouts/root.l";

// ? Pages
import { InboxPage } from "@/pages/inbox/page.p";

export const router: RouteObject[] = [
  {
    path: "u/:id",
    Component: RootLayout,
    children: [
      {
        path: "inbox",
        element: <InboxPage />,
      },
      {
        path: "sent",
        element: <></>,
      },
      {
        path: "drafts",
        element: <></>,
      },
      {
        path: "spam",
        element: <></>,
      },
      {
        path: "archive",
        element: <></>,
      },
    ],
  }
];
