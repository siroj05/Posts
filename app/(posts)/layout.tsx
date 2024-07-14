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
      <div className="p-10">
        {children}
      </div>
      <Footer />
    </div>
  )
}