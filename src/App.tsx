import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import Hero from "./components/sections/Hero";

function App() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col justify-between">
      <Header />

      {/*  */}
      <main>
        <Hero />
      </main>

      {/*  */}
      <Footer />
    </div>
  );
}

export default App;
