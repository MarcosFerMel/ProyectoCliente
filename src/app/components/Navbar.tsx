"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Casa Rural Altos de la Sierra
        </Link>

        {/* Menú Hamburguesa (Móvil) */}
        <button
          className="block lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menú de Navegación */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6 absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-green-600 lg:bg-transparent px-6 lg:px-0 py-4 lg:py-0 shadow-md lg:shadow-none`}
        >
          <Link href="/" className="block py-2 lg:py-0 hover:text-gray-300">
            Inicio
          </Link>
          <Link href="/rooms" className="block py-2 lg:py-0 hover:text-gray-300">
            Habitaciones
          </Link>
          <Link href="/reservations" className="block py-2 lg:py-0 hover:text-gray-300">
            Reservas
          </Link>
          <Link href="/users" className="block py-2 lg:py-0 hover:text-gray-300">
            Usuarios
          </Link>
        </div>
      </div>
    </nav>
  );
}
