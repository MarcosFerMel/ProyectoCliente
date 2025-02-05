"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Definimos el tipo de usuario con rol
type User = {
  name: string;
  role: string;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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
  };

  return (
    <nav className="bg-green-700 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Casa Rural Altos de la Sierra
        </Link>

        {/* Menú Hamburguesa (Móvil) */}
        <button
          className="block lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menú de Navegación */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6 absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-green-700 lg:bg-transparent px-6 lg:px-0 py-4 lg:py-0 shadow-md lg:shadow-none transition-all`}
        >
          <Link href="/" className="block py-2 lg:py-0 hover:text-gray-300 transition">
            Inicio
          </Link>
          <Link href="/rooms" className="block py-2 lg:py-0 hover:text-gray-300 transition">
            Habitaciones
          </Link>

          {/* Mostrar "Gestión de Reservas" si es admin, sino "Mis Reservas" */}
          {user && (
            <Link href="/reservations" className="block py-2 lg:py-0 hover:text-gray-300 transition">
              {user.role === "admin" ? "Gestión de Reservas" : "Mis Reservas"}
            </Link>
          )}

          {/* Solo mostrar "Usuarios" si el usuario es administrador */}
          {user?.role === "admin" && (
            <Link href="/users" className="block py-2 lg:py-0 hover:text-gray-300 transition">
              Usuarios
            </Link>
          )}

          {/* Autenticación */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
            {user ? (
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                <span className="block py-2 lg:py-0 font-semibold">
                  {user.name} ({user.role === "admin" ? "Administrador" : "Cliente"})
                </span>
                <button
                  onClick={handleLogout}
                  className="block py-2 lg:py-0 bg-green-800 hover:bg-green-600 text-white px-4 rounded transition-all duration-300"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block py-2 lg:py-0 bg-green-800 hover:bg-green-600 text-white px-4 rounded transition-all duration-300"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
