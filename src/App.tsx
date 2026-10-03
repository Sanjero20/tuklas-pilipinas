import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import CtaBand from "./components/sections/CtaBand";

function App() {
  return (
    <div className="mx-auto flex min-h-svh max-w-280 flex-col justify-between px-6">
      <Header />

      {/*  */}
      <main className="flex flex-col">
        <Hero />
        <Features />
        <CtaBand />
      </main>

      {/*  */}
      <Footer />
    </div>
  );
}

export default App;
