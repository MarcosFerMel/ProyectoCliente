"use client";

import { useEffect, useState } from "react";

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

  // Obtener reservas de la API
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/reservations");
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error al cargar las reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Función para cancelar reserva
  const handleCancelReservation = async (id: number) => {
    const confirmCancel = confirm("¿Estás seguro de que deseas cancelar esta reserva?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(`/api/reservations?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Reserva cancelada con éxito");
        setReservations((prevReservations) =>
          prevReservations.map((res) =>
            res.id === id ? { ...res, status: "Cancelada" } : res
          )
        );
      } else {
        alert("Error al cancelar la reserva.");
      }
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Cargando reservas...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Gestión de Reservas</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Habitación</th>
                <th className="border border-gray-300 px-4 py-2">Huésped</th>
                <th className="border border-gray-300 px-4 py-2">Check-In</th>
                <th className="border border-gray-300 px-4 py-2">Check-Out</th>
                <th className="border border-gray-300 px-4 py-2">Estado</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="border border-gray-300 px-4 py-2">{reservation.room}</td>
                  <td className="border border-gray-300 px-4 py-2">{reservation.guestName}</td>
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
                  <td className="border border-gray-300 px-4 py-2">
                    {reservation.status === "Confirmada" && (
                      <button
                        onClick={() => handleCancelReservation(reservation.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
