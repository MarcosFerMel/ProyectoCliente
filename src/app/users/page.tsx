"use client";

import { useEffect, useState } from "react";

// Definir el tipo para un usuario y una reserva
type User = {
  id: number;
  name: string;
  email: string;
};

type Reservation = {
  id: number;
  room: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  status: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Llamar a la API para obtener usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Llamar a la API para obtener reservas de un usuario
  const fetchReservationsByUser = async (userId: number) => {
    setLoadingReservations(true);
    try {
      const response = await fetch(`/api/reservations?userId=${userId}`);
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Error al cargar las reservas del usuario:", error);
    } finally {
      setLoadingReservations(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Gestión de Usuarios</h1>

        {loadingUsers ? (
          <p className="text-center">Cargando usuarios...</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Usuarios Registrados</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id} className="flex justify-between items-center mb-4">
                  <span>
                    {user.name} - {user.email}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      fetchReservationsByUser(user.id);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Ver Reservas
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mostrar reservas del usuario seleccionado */}
        {selectedUser && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Reservas de {selectedUser.name}
            </h2>
            {loadingReservations ? (
              <p className="text-center">Cargando reservas...</p>
            ) : reservations.length > 0 ? (
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Habitación</th>
                    <th className="border border-gray-300 px-4 py-2">Check-In</th>
                    <th className="border border-gray-300 px-4 py-2">Check-Out</th>
                    <th className="border border-gray-300 px-4 py-2">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {reservation.room}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {reservation.checkIn}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {reservation.checkOut}
                      </td>
                      <td
                        className={`border border-gray-300 px-4 py-2 ${
                          reservation.status === "Confirmada"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {reservation.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No hay reservas para este usuario.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
