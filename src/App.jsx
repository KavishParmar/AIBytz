import SEO from "./components/SEO";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ServicesStrap from "./components/ServicesStrap";
import HireAI from "./components/HireAI";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import Advantages from "./components/Advantages";
import FAQ from "./components/FAQ";
import StrategyCTA from "./components/StrategyCTA";
import Footer from "./components/Footer";
import DarkOutro from "./components/DarkOutro";
import ClickBurst from "./components/ClickBurst";

function Home() {
  return (
    <>
      <SEO
        title="AIBytz | AI Employees & Automation Agency"
        description="AIBytz builds AI employees, chatbots, and automations that bring customers and save time. WhatsApp bots, AI agents, n8n & Make workflows, and custom automation for businesses."
        path="/"
      />
      <Nav />
      <main>
        <Hero />
        <ServicesStrap />
        <HireAI />
        <Services />
        {/* <Work /> hidden for now, keep component and code intact */}
        <Process />
        <Advantages />
        <FAQ />
        <DarkOutro>
          <StrategyCTA />
          <Footer />
        </DarkOutro>
      </main>
      <ClickBurst />
    </>
  );
}

export default Home;
