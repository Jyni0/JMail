import { Link } from "react-router-dom";

// ? Icons
import { Inbox } from "lucide-react";

// ? Components
import { Button } from "@/components/ui/button.c";

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
  const list: ListProps[] = [
    {
      text: "Views",
      elements: [
        {
          icon: <Inbox />,
          text: "Inbox",
          number: 1,
        },
        {
          link: "/a/d",
          icon: <Inbox />,
          text: "Inbox",
          number: 0,
        },
        {
          text: "Inbox",
          number: 0,
        }
      ]
    }
  ]

  return (
    <div className="bg-sidebar border-r h-full min-w-76 p-4">
      <div className="flex flex-col gap-1">
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
