import { type RouteObject } from "react-router-dom";

// ? Components
import { RootLayout } from "./layouts/root.l";
import { ContentLayout } from "./layouts/content.l";

// ? Pages
// * Mail - Will be updated (Requires to move all in one file)
import { EmailPage } from "@/pages/mail/email/page.p";
import { InboxPage } from "@/pages/mail/inbox/page.p";
import { SentPage } from "@/pages/mail/sent/page.p";
import { DraftsPage } from "@/pages/mail/drafts/page.p";
import { SpamPage } from "@/pages/mail/spam/page.p";
import { ArchivePage } from "@/pages/mail/archive/page.p";
// * Settings
import { SettingsPage } from "@/pages/settings/page.p";

export const router: RouteObject[] = [
  {
    path: "u/:accountId",
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
          {
            path: "mail/:id",
            element: <EmailPage />,
          },
        ],
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  }
];
