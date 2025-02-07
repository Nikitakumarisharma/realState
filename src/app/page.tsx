import Plot from "@/components/plot"; // Capitalized component name
import Carausal from "@/components/Carousel"

export default function Home() {
  return (
    <main className="mt-10">
      <Carausal />
      <Plot />  
    </main>
  );
}
