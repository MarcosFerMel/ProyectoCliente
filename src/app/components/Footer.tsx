import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-8 mt-10">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start space-y-10 lg:space-y-0 px-6 lg:px-20">
        
        {/* 🔹 Mapa de Ubicación */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <h2 className="text-lg font-bold mb-4 text-center lg:text-left">Ubicación</h2>
          <iframe
            className="w-full h-64 rounded-lg border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3147.823539952691!2d-3.0042801025641457!3d37.911187058103565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6fa90042809b8b%3A0x7ae18f55a41c4372!2sRestaurante%20Hotel%20Ciudad%20de%20Cazorla!5e0!3m2!1ses!2ses!4v1738920380777!5m2!1ses!2ses"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* 🔹 Información de Contacto */}
        <div className="w-full lg:w-1/2 text-center lg:text-left lg:pl-10">
          <h2 className="text-2xl font-bold">Casa Rural Altos de la Sierra</h2>
          <p className="text-gray-400 mt-4">
            Disfruta de la naturaleza con nosotros. Comodidad, tranquilidad y la mejor atención.
          </p>

          <div className="flex flex-col mt-6 space-y-3 text-gray-300">
            <p>📍 Dirección: Calle Sierra 123, Pueblo Encantador</p>
            <p>📞 Teléfono: +34 123 456 789</p>
            <p>✉️ Email: info@casarural.com</p>
          </div>

          {/* 🔹 Redes Sociales */}
          <div className="flex justify-center lg:justify-start space-x-6 mt-6">
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

          {/* 🔹 Copyright */}
          <p className="text-gray-500 text-sm mt-6">
            © {new Date().getFullYear()} Casa Rural Altos de la Sierra. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
