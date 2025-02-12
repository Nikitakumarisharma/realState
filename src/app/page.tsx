import Plot from "@/components/plot"; // Capitalized component name
import Carausal from "@/components/Carousel"
import EasyStep from "@/components/easyStep"
import FAQ from "@/components/faq"

export default function Home() {
  return (
    <main className="mt-10">
      <Carausal />
      <EasyStep />
      <Plot />  
      <FAQ />
    </main>
  );
}
