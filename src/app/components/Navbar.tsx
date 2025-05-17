"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/app/components/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/lib/store/user.store";
import { useLanguage } from "@/lib/locales/LanguageContext";

// Definimos el tipo de usuario con rol
export type User = {
  name: string;
  role: string;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const userData = useUserStore((state) => state.userData);
  const setUserData = useUserStore((state) => state.setUserData);
  const { translator, language, changeLanguage } = useLanguage();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth");
      if (response.ok) {
        const userData: User = await response.json();
        setUserData(userData);
      }
    };

    fetchUser();
  }, []);

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    translator.locale = lang;
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setUserData(null);
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
        {/* 🔹 Logotipo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Casa Rural Logo" width={140} height={140} className="navbar-logo" />
        </Link>

        {/* 🔹 Menú Hamburguesa (Móvil) */}
        <button className="block lg:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* 🔹 Menú de Navegación - Escritorio */}
        <div className="lg:flex lg:items-center lg:space-x-6 hidden">
          <Link href="/" className="relative block py-2 lg:py-0 hover:text-gray-300 transition group">
            {translator.t("NAVBAR.HOME")}
            <motion.div
              className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              transition={{ duration: 0.5 }}
            />
          </Link>

          <Link href="/rooms" className="relative block py-2 lg:py-0 hover:text-gray-300 transition group">
            {translator.t("NAVBAR.ROOMS")}
            <motion.div
              className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              transition={{ duration: 0.5 }}
            />
          </Link>

          {userData && (
            <Link href="/reservations" className="relative block py-2 lg:py-0 hover:text-gray-300 transition group">
              {userData.role === "admin" ? translator.t("NAVBAR.ADMIN_PANEL") : translator.t("NAVBAR.RESERVATIONS")}
              <motion.div
                className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                transition={{ duration: 0.5 }}
              />
            </Link>
          )}

          {userData?.role === "admin" && (
            <Link href="/users" className="relative block py-2 lg:py-0 hover:text-gray-300 transition group">
              {translator.t("NAVBAR.USERS")}
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
          {userData ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold">{userData.name} ({userData.role === "admin" ? translator.t("NAVBAR.ADMIN") : translator.t("NAVBAR.CLIENT")})</span>
              <button onClick={handleLogout} className="bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded transition">
                {translator.t("NAVBAR.LOGOUT")}
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded transition">
              {translator.t("NAVBAR.LOGIN")}
            </Link>
          )}

          {/* 🔹 Cambio de idioma */}
          <button onClick={() => handleLanguageChange(language === "en" ? "es" : "en")} className="bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded transition">
            {language.toUpperCase()}
          </button>
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
            <Link href="/" className="block py-2 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>
              {translator.t("NAVBAR.HOME")}
            </Link>
            <Link href="/rooms" className="block py-2 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>
              {translator.t("NAVBAR.ROOMS")}
            </Link>

            {userData && (
              <Link href="/reservations" className="block py-2 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>
                {userData.role === "admin" ? translator.t("NAVBAR.ADMIN_PANEL") : translator.t("NAVBAR.RESERVATIONS")}
              </Link>
            )}

            {userData?.role === "admin" && (
              <Link href="/users" className="block py-2 hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>
                {translator.t("NAVBAR.USERS")}
              </Link>
            )}

            {/* 🔹 Dark Mode Toggle */}
            <button onClick={toggleTheme} className="flex items-center py-1 px-3 bg-gray-200 dark:bg-gray-800 text-sm rounded transition mt-4">
              {theme === "light" ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-500" />}
            </button>

            {/* 🔹 Botón de idioma */}
            <button onClick={() => handleLanguageChange(language === "en" ? "es" : "en")} className="w-full bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded transition mt-4">
              {language.toUpperCase()}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}