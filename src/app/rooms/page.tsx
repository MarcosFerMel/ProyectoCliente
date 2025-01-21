"use client";

import { useEffect, useState } from "react";

// Definir el tipo para una habitación
type Room = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  status: string;
};

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]); // Estado para las habitaciones
  const [loading, setLoading] = useState(true); // Estado para mostrar el cargando

  // Llamar a la API al cargar la página
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms"); // Llama a la API
        const data = await response.json(); // Convierte la respuesta en JSON
        setRooms(data); // Actualiza el estado de las habitaciones
      } catch (error) {
        console.error("Error al cargar las habitaciones:", error);
      } finally {
        setLoading(false); // Oculta el indicador de carga
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Cargando habitaciones...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-8">Habitaciones Disponibles</h1>

        {/* Listado de habitaciones */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-bold">{room.name}</h2>
              <p className="mt-2">Capacidad: {room.capacity} personas</p>
              <p>Precio: ${room.price} / noche</p>
              <p
                className={`mt-2 ${
                  room.status === "Disponible" ? "text-green-600" : "text-red-600"
                }`}
              >
                Estado: {room.status}
              </p>
              {room.status === "Disponible" ? (
                <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Reservar
                </button>
              ) : (
                <button
                  disabled
                  className="mt-4 bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed"
                >
                  Ocupada
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
