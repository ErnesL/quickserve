"use client";

import Link from "next/link";
import Image from "next/image";
import icon from "../public/iconCart.png";

export default function NavBar() {
  function bottomFunction() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  return (
    <nav className="w-full h-100 bg-black border-gray-200 dark:bg-black-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            NoBU | Asian Food
          </span>
        </Link>
        <div
          className="w-full md:block md:w-auto"
          id="navbar-default"
        >
          <ul className="font-medium items-center flex justify-end p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Entradas
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Platos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Bebidas
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Postres
              </a>
            </li>
            <li>
              <Link
                href={"/admin"}
                className="block py-2 px-3 text-gray-900 rounded
                hover:bg-gray-100 md:hover:bg-transparent md:border-0
                md:hover:text-blue-700 md:p-0 dark:text-white
                md:dark:hover:text-blue-500 dark:hover:bg-gray-700
                dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/consumer"}
                className="block py-2 px-3 text-gray-900 rounded
                hover:bg-gray-100 md:hover:bg-transparent md:border-0
                md:hover:text-blue-700 md:p-0 dark:text-white
                md:dark:hover:text-blue-500 dark:hover:bg-gray-700
                dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Ordenes en cola
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
