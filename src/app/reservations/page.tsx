"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [user, setUser] = useState<{ name: string; id: number } | null>(null);
  const router = useRouter();

  // Obtener usuario autenticado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth");
        if (!response.ok) {
          router.push("/login"); // Redirigir si no está autenticado
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

  // Obtener reservas del usuario autenticado
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

  if (loading) {
    return <p className="text-center mt-8">Cargando reservas...</p>;
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
                      reservation.status === "Confirmada" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {reservation.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
