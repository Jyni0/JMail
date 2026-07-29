import { useState } from "react";
import { Link } from "react-router-dom";

// ? Icons
import { Inbox, Send, File, OctagonAlert, Calendar, Star, Info, Search, Contact } from "lucide-react";

// ? Components
import { Button } from "@/components/ui/button.c";
import { Input } from "@/components/ui/input.c";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select.c";

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
  const [theme, setTheme] = useState("potuzniy@jynio.eu");
  const items = [
    { email: "potuzniy@jynio.eu", label: "Potuzniy", value: "potuzniy@jynio.eu" },
    { email: "admin@heler.gov.de", label: "Admin", value: "admin@heler.gov.de" },
    { email: "grow@google.com", label: "Grow", value: "grow@google.com" },
  ]
  const list: ListProps[] = [
    {
      text: "Mail",
      elements: [
        {
          icon: <Inbox />,
          text: "Inbox",
          number: 0,
        },
        {
          icon: <Send />,
          text: "Sent",
          number: 0,
        },
        {
          icon: <File />,
          text: "Drafts",
          number: 0,
        },
        {
          icon: <OctagonAlert />,
          text: "Spam",
          number: 0,
        },
      ]
    },
    {
      text: "Views",
      elements: [
        {
          icon: <Calendar />,
          text: "Calendar",
          number: 0,
        },
        {
          icon: <Contact />,
          text: "Contacts",
          number: 0,
        },
        {
          icon: <Star />,
          text: "Starred",
          number: 0,
        },
        {
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
        <Select
          items={items}
          value={theme}
          onValueChange={setTheme}
        >
          <SelectTrigger variant="transparent" className="justify-start">
            <div className="size-5.5 bg-secondary/25 flex items-center justify-center text-[0.75rem] rounded-2xl">{items.find((item) => item.value === theme)?.label[0]}</div>
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
        <Input icon={<Search />} placeholder="Search" variant="ghost" />
      </div>
      <div className="flex flex-col gap-4">
        {list.map((group) => (
          <Group text={group.text}>
            <>
              {group.elements.map((item) => {
                return item.link ? (
                  <Link to={item.link}>
                    <Item
                      icon={item.icon}
                      text={item.text}
                      number={item.number}
                    />
                  </Link>
                ) : (
                  <Item
                    icon={item.icon}
                    text={item.text}
                    number={item.number}
                  />
                )
              })}
            </>
          </Group>
        ))}
        {/*<Button variant="transparent">Inbox</Button>
        <Button variant="secondary">Inbox</Button>
        <Button className="w-min" variant="secondary" size="small">Send</Button>*/}
      </div>
    </div>
  );
};

interface ItemProps {
  icon?: React.ReactElement;
  text: string;
  number: number;
};

function Item({ icon, text, number, ...props }: typeof Button & ItemProps) {
  return (
    <Button variant="transparent" className="w-full flex flex-row justify-between items-center text-muted hover:text-color hover:bg-secondary/25 transition-colors" {...props}>
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
