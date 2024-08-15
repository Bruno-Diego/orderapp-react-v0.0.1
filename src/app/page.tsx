import FeaturedCarouselComponent from "@/components/FeaturedCarrousel";
import Categories from "@/components/Categories";
import { checkUser } from "@/lib/checkUser";

export default async function Home() {
  const checkingUser = await checkUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <FeaturedCarouselComponent />
      <Categories />
    </main>
  );
}
