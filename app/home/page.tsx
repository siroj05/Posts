import Footer from "@/components/footer";
import { NavigationBar } from "@/components/navbar";
import { Posts } from "@/components/posts/posts";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className="flex-grow">
        <Posts />
      </div>
      <Footer />
    </div>
    </>
  );
}
