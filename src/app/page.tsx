import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Casa Rural Altos de la Sierra</h1>
          <p className="text-lg mt-2">Disfruta de la naturaleza y la tranquilidad</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-8 text-center">
        <p className="text-xl mb-6">
          Bienvenido a nuestra casa rural. Ofrecemos habitaciones acogedoras, vistas increíbles y
          una experiencia inolvidable.
        </p>
        <div className="space-y-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Consultar Disponibilidad
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/rooms">Ver Habitaciones</Link>
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/reservations">Ver Reservas</Link>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>Contacto: casarural@example.com | Tel: 123-456-7890</p>
          <p>&copy; 2025 Casa Rural Altos de la Sierra</p>
        </div>
      </footer>
    </div>
  );
}
