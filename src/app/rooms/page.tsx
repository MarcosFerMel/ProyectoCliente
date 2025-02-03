"use client";

import { useEffect, useState } from "react";

type Room = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  status: string;
};

type User = {
  id: number;
  name: string;
};

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [guestName, setGuestName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Llamar a la API al cargar habitaciones y usuarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsResponse = await fetch("/api/rooms");
        const usersResponse = await fetch("/api/users");
        const roomsData = await roomsResponse.json();
        const usersData = await usersResponse.json();
        setRooms(roomsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReserve = async () => {
    if (!guestName || !checkIn || !checkOut || !selectedUserId) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const reservation = {
        room: selectedRoom?.name,
        guestName,
        checkIn,
        checkOut,
        status: "Confirmada",
        userId: selectedUserId,
      };

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (response.ok) {
        alert("Reserva creada con éxito");
        setModalOpen(false);
        setGuestName("");
        setCheckIn("");
        setCheckOut("");
      } else {
        alert("Hubo un error al crear la reserva.");
      }
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Cargando habitaciones...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Habitaciones Disponibles</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-bold">{room.name}</h2>
              <p className="mt-2">Capacidad: {room.capacity} personas</p>
              <p>Precio: {room.price} € / noche</p>
              <p
                className={`mt-2 ${
                  room.status === "Disponible" ? "text-green-600" : "text-red-600"
                }`}
              >
                Estado: {room.status}
              </p>
              {room.status === "Disponible" ? (
                <button
                  onClick={() => {
                    setSelectedRoom(room);
                    setModalOpen(true);
                  }}
                  className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
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

        {/* Modal para crear una reserva */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Reservar {selectedRoom?.name}</h2>
              <label className="block mb-2">
                Seleccione Usuario:
                <select
                  value={selectedUserId || ""}
                  onChange={(e) => setSelectedUserId(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                >
                  <option value="">Seleccione un usuario</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Nombre del Huésped:
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </label>
              <label className="block mb-2">
                Check-In:
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </label>
              <label className="block mb-2">
                Check-Out:
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </label>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReserve}
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
