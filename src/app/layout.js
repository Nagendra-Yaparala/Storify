import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TodoList",
  description: "add your own tasks ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <TopBar/>
        <div className="mx-40 mt-20">
        {children}
        </div>
      
      </body>
    </html>
  );
}
