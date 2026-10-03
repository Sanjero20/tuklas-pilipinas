import { Link } from "wouter";
import ThemeToggle from "../components/ui/ThemeToggle";

function Header() {
  return (
    <header className="border-ink flex items-center justify-between border-b py-4">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-2">
          <img src="/sun-gold.svg" className="h-8 w-8" />
          <h1 className="font-serif text-2xl">Tuklas</h1>
        </div>
      </Link>

      {/*  */}
      <nav className="space-x-4 font-mono text-sm decoration-2">
        <Link
          href="/explore"
          className={(active) => (active ? "underline underline-offset-6" : "")}
        >
          Explore
        </Link>
        <Link
          href="/play"
          className={(active) => (active ? "underline underline-offset-6" : "")}
        >
          Play
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}

export default Header;
