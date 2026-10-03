import { Route, Switch } from "wouter";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import LandingPage from "./pages/LandingPage";
import ExplorePage from "./pages/ExplorePage";
import PlayPage from "./pages/PlayPlage";

function App() {
  return (
    <div className="mx-auto flex min-h-svh max-w-280 flex-col justify-between px-6">
      <Header />

      {/*  */}
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/play" component={PlayPage} />
        <Route>404: Page not found</Route>
      </Switch>

      {/*  */}
      <Footer />
    </div>
  );
}

export default App;
