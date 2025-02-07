"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";

// Definir los tipos para usuarios y reservas
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  // Obtener usuario autenticado
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth");
      if (!response.ok) {
        router.push("/login"); // Si no está autenticado, redirigir a login
        return;
      }

      const userData = await response.json();
      setCurrentUser(userData);

      if (userData.role !== "admin") {
        router.push("/"); // Si no es admin, redirigir a home
      }
    };

    fetchUser();
  }, [router]);

  // Obtener la lista de usuarios (solo admin)
  useEffect(() => {
    if (currentUser?.role === "admin") {
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
    }
  }, [currentUser]);

  // Obtener reservas del usuario seleccionado
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

  if (loadingUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Gestión de Usuarios</h1>

        {/* Lista de Usuarios */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Usuarios Registrados</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        fetchReservationsByUser(user.id);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Ver Reservas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mostrar reservas del usuario seleccionado */}
        {selectedUser && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Reservas de {selectedUser.name}
            </h2>
            {loadingReservations ? (
              <p className="text-center">Cargando reservas...</p>
            ) : reservations.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300">
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
                    <tr key={reservation.id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{reservation.room}</td>
                      <td className="border border-gray-300 px-4 py-2">{reservation.checkIn}</td>
                      <td className="border border-gray-300 px-4 py-2">{reservation.checkOut}</td>
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
