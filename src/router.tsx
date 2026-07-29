import { type RouteObject } from "react-router-dom";

// ? Components
import { RootLayout } from "./layouts/root.l";
import { ContentLayout } from "./layouts/content.l";

// ? Pages
import { InboxPage } from "@/pages/mail/inbox/page.p";

export const router: RouteObject[] = [
  {
    path: "u/:id",
    Component: RootLayout,
    children: [
      {
        Component: ContentLayout,
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
      },
    ],
  }
];
