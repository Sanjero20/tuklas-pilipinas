type Props = {
  selected?: boolean;
  title?: string;
  onClick: () => void;
  children: React.ReactNode;
};

const base =
  "cursor-pointer rounded-sm border border-ink px-2.5 py-1 font-mono text-xs transition-colors";

function Chip({ selected = false, title, onClick, children }: Props) {
  return (
    <button
      type="button"
      title={title}
      aria-pressed={selected}
      onClick={onClick}
      className={`${base} ${selected ? "bg-ink text-paper" : "hover:bg-ink hover:text-paper"}`}
    >
      {children}
    </button>
  );
}

export default Chip;
