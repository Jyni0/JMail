interface NavbarProps {
  title: string;
  icon: React.ReactElement;
  children?: React.ReactElement;
}

export function ContentNavbar({ title, icon, children }: NavbarProps) {
  return (
    <div className="h-13 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center [&_>svg]:size-5.5 pl-3 gap-2">
        {icon}
        <p>{title}</p>
      </div>
      {children &&
        <div className="flex flex-row">
          {children}
        </div>
      }
    </div>
  );
};
