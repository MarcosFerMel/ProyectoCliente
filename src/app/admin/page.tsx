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

export default function AdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth");
      if (!response.ok) {
        router.push("/login"); 
      } else {
        const userData = await response.json();
        setUser(userData);
        if (userData.role !== "admin") {
          router.push("/"); // Redirigir si no es admin
        }
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    if (user?.role === "admin") {
      const fetchReservations = async () => {
        const response = await fetch("/api/reservations");
        const data = await response.json();
        setReservations(data);
      };

      fetchReservations();
    }
  }, [user]);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Panel de Administración</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="table-container">
          <thead>
            <tr>
              <th>Habitación</th>
              <th>Huésped</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.room}</td>
                <td>{reservation.guestName}</td>
                <td>{reservation.checkIn}</td>
                <td>{reservation.checkOut}</td>
                <td>{reservation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
