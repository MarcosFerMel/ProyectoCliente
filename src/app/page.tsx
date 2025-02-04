import Image from "next/image";
import GalleryComponent from "@/app/components/Gallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-[500px]">
        <Image
          src="/hero-image.jpg"
          alt="Casa rural en la montaña"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-bold">Casa Rural Altos de la Sierra</h1>
          <p className="text-xl mt-4">Descansa y disfruta de la naturaleza</p>
        </div>
      </div>

      {/* Sección "Sobre Nosotros" */}
      <section className="container mx-auto my-12 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Sobre Nosotros</h2>
        <p className="text-lg text-gray-700">
          Nuestra casa rural ofrece un entorno tranquilo en plena naturaleza. Disfruta de una estancia inolvidable con vistas impresionantes y comodidad excepcional.
        </p>
      </section>

      {/* Sección de Servicios */}
      <section className="bg-white py-12">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Alojamiento Confortable</h3>
              <p className="text-gray-700">Habitaciones acogedoras con vistas espectaculares.</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Gastronomía Local</h3>
              <p className="text-gray-700">Disfruta de productos frescos y recetas tradicionales.</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Actividades al Aire Libre</h3>
              <p className="text-gray-700">Senderismo, ciclismo y mucho más en plena naturaleza.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Imágenes */}
      <GalleryComponent />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>Contacto: casarural@example.com | Tel: 123-456-7890</p>
          <p>&copy; 2025 Casa Rural Altos de la Sierra</p>
        </div>
      </footer>
    </div>
  );
}
