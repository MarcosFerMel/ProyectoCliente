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

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Gestión de Reservas</h1>
      {loading ? (
        <p className="text-center">Cargando reservas...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="table-container">
            <thead>
              <tr>
                <th>Habitación</th>
                <th>Huésped</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.room}</td>
                  <td>{reservation.guestName}</td>
                  <td>{reservation.checkIn}</td>
                  <td>{reservation.checkOut}</td>
                  <td className={reservation.status === "Confirmada" ? "text-green-600" : "text-red-600"}>
                    {reservation.status}
                  </td>
                  <td>
                    {reservation.status === "Confirmada" && (
                      <button className="btn-danger">Cancelar</button>
                    )}
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
