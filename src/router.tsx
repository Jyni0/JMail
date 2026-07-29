import { type RouteObject } from "react-router-dom";

// ? Components
import { RootLayout } from "./layouts/root.l";
import { ContentLayout } from "./layouts/content.l";

// ? Pages
import { InboxPage } from "@/pages/mail/inbox/page.p";
import { SentPage } from "@/pages/mail/sent/page.p";
import { DraftsPage } from "@/pages/mail/drafts/page.p";
import { SpamPage } from "@/pages/mail/spam/page.p";
import { ArchivePage } from "@/pages/mail/archive/page.p";

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
            element: <SentPage />,
          },
          {
            path: "drafts",
            element: <DraftsPage />,
          },
          {
            path: "spam",
            element: <SpamPage />,
          },
          {
            path: "archive",
            element: <ArchivePage />,
          },
        ],
      },
    ],
  }
];
