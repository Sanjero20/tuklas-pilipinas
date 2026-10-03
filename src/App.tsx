import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Hero from "./layouts/Hero";

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
