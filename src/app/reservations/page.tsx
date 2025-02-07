"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";


type Reservation = {
  id: number;
  room: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  status: string;
};

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; id: number; role: string } | null>(null);
  const router = useRouter();

  // Obtener usuario autenticado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth");
        if (!response.ok) {
          router.push("/login");
          return;
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    fetchUser();
  }, [router]);

  // Obtener reservas del usuario autenticado o todas si es admin
  useEffect(() => {
    if (user) {
      const fetchReservations = async () => {
        try {
          const response = await fetch(`/api/reservations?userId=${user.id}`);
          if (!response.ok) throw new Error("No se pudieron cargar las reservas");

          const data = await response.json();
          setReservations(data);
        } catch (error) {
          console.error("Error al cargar las reservas:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchReservations();
    }
  }, [user]);

  // Función para actualizar el estado de una reserva
  const updateReservationStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/reservations`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setReservations((prev) =>
          prev.map((res) => (res.id === id ? { ...res, status: newStatus } : res))
        );
      } else {
        alert("Error al actualizar la reserva.");
      }
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Mis Reservas</h1>
      {reservations.length === 0 ? (
        <p className="text-center">No tienes reservas registradas.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Habitación</th>
                <th className="border border-gray-300 px-4 py-2">Check-In</th>
                <th className="border border-gray-300 px-4 py-2">Check-Out</th>
                <th className="border border-gray-300 px-4 py-2">Estado</th>
                {user?.role === "admin" && <th className="border border-gray-300 px-4 py-2">Acciones</th>}
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
                      reservation.status === "Confirmada" ? "text-green-600" :
                      reservation.status === "Cancelada" ? "text-red-600" :
                      "text-yellow-600"
                    }`}
                  >
                    {reservation.status}
                  </td>
                  {user?.role === "admin" && (
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => updateReservationStatus(reservation.id, "Confirmada")}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        disabled={reservation.status === "Confirmada"}
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => updateReservationStatus(reservation.id, "Cancelada")}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        disabled={reservation.status === "Cancelada"}
                      >
                        Cancelar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
