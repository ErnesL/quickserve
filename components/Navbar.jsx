"use client";

import Link from "next/link";
import Image from "next/image";
import icon from "../public/iconCart.png";

export default function NavBar() {
  function bottomFunction() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  return (
    <nav className="w-full h-100 bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            QuickServe
          </span>
        </Link>
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium items-center flex justify-end p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
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
                Añadir
              </Link>
            </li>
            <li>
              <Link
                href={"/cart"}
                className="block py-2 px-3 text-gray-900 rounded
                hover:bg-gray-100 md:hover:bg-transparent md:border-0
                md:hover:text-blue-700 md:p-0 dark:text-white
                md:dark:hover:text-blue-500 dark:hover:bg-gray-700
                dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Carrito
              </Link>
            </li>
            {/* <li>
              <button onClick={bottomFunction}>
                <Image
                  className="grid justify-items-center"
                  alt="Cart"
                  src={icon}
                  style={{
                    maxWidth: "10%",
                    height: "auto",
                  }}
                />
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
