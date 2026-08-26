import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ? Icons
import { Inbox, Send, File, OctagonAlert, Calendar, Star, Info, Search, Contact, Settings, Archive } from "lucide-react";

// ? Components
import { Button } from "@/components/ui/button.c";
import { Input } from "@/components/ui/input.c";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select.c";
import { CreateMail } from "@/components/navigation/sidebar/create-mail.c";

interface ListProps {
  text: string;
  elements: {
    link?: string;
    icon?: React.ReactElement;
    text: string;
    number: number;
  }[];
}

export function Sidebar() {
  const [selectedEmail, setSelectedEmail] = useState("019fb012-e8d6-7394-b6b4-2374e4b4f803");
  const [selectedPage, setSelectedPage] = useState<string>("00");
  const items = [
    { email: "potuzniy@jynio.eu", label: "Potuzniy", value: "019fb012-e8d6-7394-b6b4-2374e4b4f803" },
    { email: "admin@heler.gov.de", label: "Admin", value: "019fb013-9110-775f-ac79-39c4adee8518" },
    { email: "grow@google.com", label: "Grow", value: "019fb013-a524-7046-9982-5f69a87e2307" },
  ]
  const list: ListProps[] = [
    {
      text: "Mail",
      elements: [
        {
          link: `/u/${selectedEmail}/inbox`,
          icon: <Inbox />,
          text: "Inbox",
          number: 0,
        },
        {
          link: `/u/${selectedEmail}/sent`,
          icon: <Send />,
          text: "Sent",
          number: 0,
        },
        {
          link: `/u/${selectedEmail}/drafts`,
          icon: <File />,
          text: "Drafts",
          number: 0,
        },
        {
          link: `/u/${selectedEmail}/spam`,
          icon: <OctagonAlert />,
          text: "Spam",
          number: 0,
        },
        {
          link: `/u/${selectedEmail}/archive`,
          icon: <Archive />,
          text: "Archive",
          number: 0,
        },
      ]
    },
    {
      text: "Views",
      elements: [
        {
          link: `/u/${selectedEmail}/calendar`,
          icon: <Calendar />,
          text: "Calendar",
          number: 0,
        },
        {
          link: `/u/${selectedEmail}/contacts`,
          icon: <Contact />,
          text: "Contacts",
          number: 0,
        },
        {
          link: `/u/${selectedEmail}/starred`,
          icon: <Star />,
          text: "Starred",
          number: 0,
        },
        {
          link: `/updates`,
          icon: <Info />,
          text: "Updates",
          number: 0,
        },
      ]
    }
  ]

  return (
    <div className="bg-sidebar border-r h-full min-w-70 p-4">
      <div className="flex flex-col gap-2 pb-4">
        <div className="flex flex-row gap-2">
          <Select
            items={items}
            value={selectedEmail}
            onValueChange={setSelectedEmail}
          >
            <SelectTrigger variant="transparent" className="justify-start">
              <div className="size-5.5 bg-secondary/25 flex items-center justify-center text-[0.75rem] rounded-2xl">{items.find((item) => item.value === selectedEmail)?.label[0]}</div>
              <SelectValue placeholder="Email" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="[&_>span]:flex [&_>span]:flex-row [&_>span]:items-center [&_>span]:gap-2"
                  >
                    <div className="size-5.5 bg-secondary/25 flex items-center justify-center text-[0.75rem] rounded-2xl">{item.label[0]}</div>
                    {item.email}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <CreateMail from={items.find((item) => item.value === selectedEmail)?.email} />
        </div>
        <Input icon={<Search />} placeholder="Search" variant="ghost" />
      </div>
      <div className="h-full max-h-[calc(100vh-161px)] overflow-auto flex flex-col gap-4">
        {list.map((group, idx) => (
          <Group text={group.text}>
            <>
              {group.elements.map((item, idx2) => {
                return item.link ? (
                  <Link to={item.link}>
                    <Item
                      icon={item.icon}
                      text={item.text}
                      number={item.number}
                      isCurrent={selectedPage === `${idx}${idx2}`}
                      onClick={() => setSelectedPage(`${idx}${idx2}`)}
                    />
                  </Link>
                ) : (
                  <Item
                    icon={item.icon}
                    text={item.text}
                    number={item.number}
                    isCurrent={selectedPage === `${idx}${idx2}`}
                    onClick={() => setSelectedPage(`${idx}${idx2}`)}
                  />
                )
              })}
            </>
          </Group>
        ))}
      </div>
      <div className="flex flex-row border-t py-2">
        <Link to={`/u/${selectedEmail}/settings`} className="h-8">
          <Button
            variant="ghost"
            size="small"
            className={selectedPage === "settings" ? "bg-secondary/25 text-color" : ""}
            onClick={() => setSelectedPage(`settings`)}
          >
            <Settings className="size-4.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

interface ItemProps {
  icon?: React.ReactElement;
  text: string;
  number: number;
  className?: string;
  isCurrent: boolean;
};

function Item({ icon, text, number, className, isCurrent, ...props }: ItemProps & React.ComponentProps<"button">) {
  return (
    <Button variant="ghost" className={cn("w-full flex flex-row justify-between items-center text-muted hover:text-color hover:bg-secondary/25 transition-colors", isCurrent ? "bg-secondary/25 text-color" : "", className)} {...props}>
      <div className="flex flex-row items-center gap-2 [&_>svg]:size-5.5 [&_>svg]:text-muted">
        {icon && icon}
        {text}
      </div>
      {number > 0 && <span className="text-muted">{number}</span>}
    </Button>
  );
}

interface GroupProps {
  text: string;
  children: React.ReactElement;
}

function Group({ text, children }: GroupProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-sm text-muted pl-3">{text}</h3>
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  );
}
