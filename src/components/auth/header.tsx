interface HeaderProps {
  title: string;
  headerLabel: string;
}

export const Header = ({ title, headerLabel }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-[16px] text-muted-foreground font-normal">
        {headerLabel}
      </p>
    </div>
  );
};
