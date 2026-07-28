import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { WhyUs } from "./components/WhyUs";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white w-full overflow-x-hidden selection:bg-white selection:text-black">
      <Nav />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;
