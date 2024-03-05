"use client";

import Link from "next/link";
import Image from "next/image";
import NoBU from "../public/logoNoBU.png";
//import Team from "../public/logoTeam.png";

export default function NavBar() {
  return (
    <nav className="w-full min-h-100 max-h-100 bg-black border-gray-200 dark:bg-black-900 fixed m-0 p-0 top-0 overflow-hidden z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link
          href={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="hover:text-[#9974D9] m-3 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <Image src={NoBU} alt="Logo" width={250} height={80} />
          </span>
        </Link>
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium items-center flex justify-end p-4 md:p-0 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse">
            <li>
              <a
                href="#entradas"
                className="block py-2 px-3 text-white rounded hover:text-[#9974D9]"
                aria-current="page"
              >
                Entradas
              </a>
            </li>
            <li>
              <a
                href="#platos"
                className="block py-2 px-3 text-white rounded hover:text-[#9974D9]"
              >
                Platos
              </a>
            </li>
            <li>
              <a
                href="#bebidas"
                className="block py-2 px-3 text-white rounded hover:text-[#9974D9]"
              >
                Bebidas
              </a>
            </li>
            <li>
              <a
                href="#postres"
                className="block py-2 px-3 text-white rounded hover:text-[#9974D9]"
              >
                Postres
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
