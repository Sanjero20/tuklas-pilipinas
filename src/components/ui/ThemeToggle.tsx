import { useTheme } from "../../hooks/useTheme";

function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="hover:text-accent focus-visible:outline-accent cursor-pointer text-base leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      ◐
    </button>
  );
}

export default ThemeToggle;
