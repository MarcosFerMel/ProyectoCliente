"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/app/components/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner"; // 🔹 Importamos el spinner

type User = {
  name: string;
  role: string;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 🔹 Estado para carga
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth");
        if (response.ok) {
          const userData: User = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      } finally {
        setLoading(false); // 🔹 Detener carga cuando termine la petición
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
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-green-700 text-white py-4 px-6 shadow-md relative z-50"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Casa Rural Logo" width={40} height={40} className="rounded-full" />
          <span className="text-2xl font-bold hidden md:block">Casa Rural Altos de la Sierra</span>
        </Link>

        <button className="block lg:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className="lg:flex lg:items-center lg:space-x-6 hidden">
          <Link href="/" className="block py-2 lg:py-0 hover:text-gray-300 transition">Inicio</Link>
          <Link href="/rooms" className="block py-2 lg:py-0 hover:text-gray-300 transition">Habitaciones</Link>

          {loading ? (
            <LoadingSpinner /> // 🔹 Mostrar spinner mientras carga el usuario
          ) : (
            user && (
              <Link href="/reservations" className="block py-2 lg:py-0 hover:text-gray-300 transition">
                {user.role === "admin" ? "Gestión de Reservas" : "Mis Reservas"}
              </Link>
            )
          )}

          {user?.role === "admin" && (
            <Link href="/users" className="block py-2 lg:py-0 hover:text-gray-300 transition">Usuarios</Link>
          )}

          <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition">
            {theme === "light" ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-500" />}
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold">{user.name} ({user.role === "admin" ? "Administrador" : "Cliente"})</span>
              <button onClick={handleLogout} className="bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                Salir
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded transition">
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
