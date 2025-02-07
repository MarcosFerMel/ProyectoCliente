"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/app/components/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-green-700 text-white py-4 px-6 shadow-md relative z-50"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* 🔹 Solo el Logotipo (sin texto) */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Casa Rural Logo"
            width={140}
            height={140}
            className="navbar-logo"
          />
        </Link>

        {/* 🔹 Menú Hamburguesa (Móvil) */}
        <button className="block lg:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* 🔹 Menú de Navegación - Escritorio */}
        <div className="lg:flex lg:items-center lg:space-x-6 hidden">
          <Link href="/" className="relative block py-2 lg:py-0 hover:text-gray-300 transition group">
            Inicio
            <motion.div
              className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              transition={{ duration: 0.5 }}
            />
          </Link>

          <Link href="/rooms" className="relative block py-2 lg:py-0 hover:text-gray-300 transition group">
            Habitaciones
            <motion.div
              className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              transition={{ duration: 0.5 }}
            />
          </Link>

          {user && (
            <Link href="/reservations" className="relative block py-2 lg:py-0 hover:text-gray-300 transition group">
              {user.role === "admin" ? "Gestión de Reservas" : "Mis Reservas"}
              <motion.div
                className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                transition={{ duration: 0.5 }}
              />
            </Link>
          )}

          {user?.role === "admin" && (
            <Link href="/users" className="relative block py-2 lg:py-0 hover:text-gray-300 transition group">
              Usuarios
              <motion.div
                className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                transition={{ duration: 0.8 }}
              />
            </Link>
          )}

          {/* 🔹 Dark Mode Toggle */}
          <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition">
            {theme === "light" ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-500" />}
          </button>

          {/* 🔹 Botones de Autenticación */}
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

      {/* 🔹 Menú Desplegable - Móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-green-700 lg:hidden px-6 py-4 shadow-md"
          >
            <Link href="/" className="block py-2 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link href="/rooms" className="block py-2 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>Habitaciones</Link>

            {user && (
              <Link href="/reservations" className="block py-2 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>
                {user.role === "admin" ? "Gestión de Reservas" : "Mis Reservas"}
              </Link>
            )}

            {user?.role === "admin" && (
              <Link href="/users" className="block py-2 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>Usuarios</Link>
            )}

            {/* 🔹 Dark Mode Toggle */}
            <div className="mt-4">
              <button
                onClick={toggleTheme}
                className="flex items-center py-1 px-3 bg-gray-200 dark:bg-gray-800 text-sm rounded transition"
              >
                {theme === "light" ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-500" />}
                <span className="ml-2 text-sm"></span>
              </button>
            </div>

            {/* 🔹 Botones de Autenticación */}
            {user ? (
              <div className="mt-6">
                <span className="block py-2 font-semibold">{user.name} ({user.role === "admin" ? "Administrador" : "Cliente"})</span>
                <button onClick={handleLogout} className="w-full bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded transition mt-2">
                  Salir
                </button>
              </div>
            ) : (
              <Link href="/login" className="block w-full text-center bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded transition mt-2" onClick={() => setMenuOpen(false)}>
                Ingresar
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
