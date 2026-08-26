interface NavbarProps {
  title: string;
  icon: React.ReactElement;
  children?: React.ReactElement;
}

export function ContentNavbar({ title, icon, children }: NavbarProps) {
  return (
    <div className="h-13 flex flex-row justify-between">
      <div className="h-full flex items-center">
        <div className="flex flex-row items-center [&_>svg]:size-5.5 pl-3 gap-2">
          {icon}
          <p>{title}</p>
        </div>
      </div>
      <span data-type="drag" className="w-full"></span>
      {children ?
        <div className="min-w-[96px] flex flex-row">
          {children}
        </div>
      :
        <div className="min-w-[96px]"></div>
      }
    </div>
  );
};
