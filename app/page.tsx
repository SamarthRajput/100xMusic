import Link from "next/link";
import { Appbar } from "../components/Appbar";
import Image from "next/image";
import Music from "@/public/music-4.svg"
import { Redirect } from "@/components/Redirect";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900">
      <Appbar />
      <Redirect />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="flex justify-center items-center">
                  <Image src={Music} alt="" className="flex justify-center items-center" width={80}></Image>
              </div>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                A 100xMusic platform for all the 100xDevelopers.
              </p>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                A Music Application where people can listen to music anytime for free without ads...
              </p>
            </div>
            </div>
        </div>
      </main>
    </div>
  );
}
