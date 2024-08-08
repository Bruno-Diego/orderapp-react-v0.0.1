import Image from "next/image";
import FeaturedCarouselComponent from "@/components/FeaturedCarrousel";
import Categories from "@/components/Categories";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FeaturedCarouselComponent />
      <Categories />
    </main>
  );
}
