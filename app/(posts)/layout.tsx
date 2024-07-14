import Footer from "@/components/footer";
import { NavigationBar } from "@/components/navbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return(
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className="2xl:p-10 xl:p-10 lg:p-10 md:p-10 w-full">
        {children}
      </div>
      <Footer />
    </div>
  )
}