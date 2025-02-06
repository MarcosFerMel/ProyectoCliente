"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/app/components/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";

// Definimos el tipo de usuario con rol
type User = {
  name: string;
  role: string;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth");
      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-green-700 text-white py-4 px-6 shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* 🔹 Logo + Nombre (Este nunca cambia de color) */}
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Casa Rural Logo" width={40} height={40} className="rounded-full" />
          <span className="text-2xl font-bold hidden md:block">Casa Rural Altos de la Sierra</span>
        </Link>

        {/* 🔹 Menú Hamburguesa (Móvil) */}
        <button className="block lg:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* 🔹 Menú de Navegación */}
        <div className={`lg:flex lg:items-center lg:space-x-6 absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-green-700 px-6 lg:px-0 py-4 lg:py-0 shadow-md lg:shadow-none transition-all duration-300 ${menuOpen ? "block" : "hidden lg:flex"}`}>
          
          <Link href="/" className="block py-2 lg:py-0 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link href="/rooms" className="block py-2 lg:py-0 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>Habitaciones</Link>

          {user && (
            <Link href="/reservations" className="block py-2 lg:py-0 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>
              {user.role === "admin" ? "Gestión de Reservas" : "Mis Reservas"}
            </Link>
          )}

          {user?.role === "admin" && (
            <Link href="/users" className="block py-2 lg:py-0 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>Usuarios</Link>
          )}

          {/* 🔹 Dark Mode Toggle */}
          <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition">
            {theme === "light" ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-500" />}
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-4 lg:mt-0">
            {user ? (
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                <span className="block py-2 lg:py-0 font-semibold">
                  {user.name} ({user.role === "admin" ? "Administrador" : "Cliente"})
                </span>
                <button onClick={handleLogout} className="block py-2 lg:py-0 bg-green-800 hover:bg-green-600 text-white px-4 rounded transition">
                  Salir
                </button>
              </div>
            ) : (
              <Link href="/login" className="block py-2 lg:py-0 bg-green-800 hover:bg-green-600 text-white px-4 rounded transition" onClick={() => setMenuOpen(false)}>
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
