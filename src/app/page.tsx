import Plot from "@/components/plot"; // Capitalized component name
import Carausal from "@/components/Carousel"
import EasyStep from "@/components/easyStep"

export default function Home() {
  return (
    <main className="mt-10">
      <Carausal />
      <EasyStep />
      <Plot />  
    </main>
  );
}
