function Header() {
  return (
    <header className="border-ink flex items-center justify-between border-b py-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/sun-gold.svg" className="h-8 w-8" />
        <h1 className="font-serif text-2xl">Tuklas</h1>
      </div>

      {/*  */}
      <nav className="space-x-2 font-mono text-sm">
        <a href="">Play</a>
        <a href="">Explore</a>

        {/* Theme toggle */}
        {/* <button></button> */}
      </nav>
    </header>
  );
}

export default Header;
