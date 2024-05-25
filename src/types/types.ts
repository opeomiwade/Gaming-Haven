export type TabProps = {
    isSelected: boolean;
    onSelect: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
  };