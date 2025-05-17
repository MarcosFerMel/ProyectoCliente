"use client";

import Image from "next/image";
import GalleryComponent from "@/app/components/Gallery";
import { useLanguage } from "@/lib/locales/LanguageContext";

export default function Home() {
  const { translator } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[500px]">
        <Image
          src="/hero-image.jpg"
          alt={translator.t("HOME.HERO_IMAGE_ALT")}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-bold">{translator.t("HOME.HERO_TITLE")}</h1>
          <p className="text-xl mt-4">{translator.t("HOME.HERO_SUBTITLE")}</p>
        </div>
      </div>

      {/* Sección "Sobre Nosotros" */}
      <section className="container mx-auto my-12 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">{translator.t("HOME.ABOUT_TITLE")}</h2>
        <p className="text-lg text-gray-700">
          {translator.t("HOME.ABOUT_TEXT")}
        </p>
      </section>

      {/* Sección de Servicios */}
      <section className="bg-white py-12">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">{translator.t("HOME.SERVICES_TITLE")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{translator.t("HOME.SERVICE_1_TITLE")}</h3>
              <p className="text-gray-700">{translator.t("HOME.SERVICE_1_TEXT")}</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{translator.t("HOME.SERVICE_2_TITLE")}</h3>
              <p className="text-gray-700">{translator.t("HOME.SERVICE_2_TEXT")}</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{translator.t("HOME.SERVICE_3_TITLE")}</h3>
              <p className="text-gray-700">{translator.t("HOME.SERVICE_3_TEXT")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Imágenes */}
      <GalleryComponent />
    </div>
  );
}
