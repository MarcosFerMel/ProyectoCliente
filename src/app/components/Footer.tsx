import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto text-center space-y-6 px-6 lg:px-20">
        {/* Logo y Descripción */}
        <div>
          <h2 className="text-2xl font-bold">Casa Rural Altos de la Sierra</h2>
          <p className="text-gray-400 mt-2">
            Disfruta de la naturaleza con nosotros. Comodidad, tranquilidad y la mejor atención.
          </p>
        </div>

        {/* Información de Contacto */}
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-10 text-gray-300">
          <p>📍 Dirección: Calle Sierra 123, Pueblo Encantador</p>
          <p>📞 Teléfono: +34 123 456 789</p>
          <p>✉️ Email: info@casarural.com</p>
        </div>

        {/* Redes Sociales */}
        <div className="flex justify-center space-x-6">
          <Link href="https://facebook.com" target="_blank" className="text-blue-500 hover:text-blue-400 text-2xl">
            <FaFacebook />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="text-pink-500 hover:text-pink-400 text-2xl">
            <FaInstagram />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="text-blue-400 hover:text-blue-300 text-2xl">
            <FaTwitter />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Casa Rural Altos de la Sierra. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
