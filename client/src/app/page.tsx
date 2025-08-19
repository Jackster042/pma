import Image from "next/image";
import HomePage from "./home/page";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20 dark:text-white">
      <HomePage />
    </div>
  );
}
