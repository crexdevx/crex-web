import { Switch, Route } from "wouter";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Reviews } from "./components/Reviews";
import { WhyUs } from "./components/WhyUs";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import Admin from "./pages/Admin";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white w-full overflow-x-hidden selection:bg-white selection:text-black">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Reviews />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route component={Home} />
    </Switch>
  );
}

export default App;
