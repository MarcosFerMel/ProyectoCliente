import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import users from "../auth/users";

const SECRET_KEY = "mi_secreto_super_seguro";

let reservations = [
  {
    id: 1,
    room: "Habitación Doble",
    guestName: "Juan Pérez",
    checkIn: "2025-01-15",
    checkOut: "2025-01-17",
    status: "Confirmada",
    userId: 1,
  },
  {
    id: 2,
    room: "Suite Familiar",
    guestName: "María Gómez",
    checkIn: "2025-01-18",
    checkOut: "2025-01-22",
    status: "Confirmada",
    userId: 2,
  },
];

// Obtener reservas (Usuarios ven solo sus reservas, Admins ven todas)
export async function GET(request) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { id: userId, role: userRole } = decoded;

    if (userRole === "admin") {
      return NextResponse.json(reservations); // Admin ve todas las reservas
    }

    const userReservations = reservations.filter((res) => res.userId === userId);
    return NextResponse.json(userReservations);
  } catch (error) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}

// Crear nueva reserva (Solo autenticados)
export async function POST(request) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const newReservation = await request.json();
    newReservation.id = reservations.length + 1; // Generar un ID único
    newReservation.status = "Confirmada"; // Por defecto, la reserva está confirmada
    newReservation.userId = userId; // Asociar reserva al usuario autenticado

    reservations.push(newReservation);

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}

// Cancelar reserva (Solo autenticados)
export async function DELETE(request) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const userRole = decoded.role;

    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id") || "0", 10);

    if (!id) {
      return NextResponse.json({ message: "ID de reserva inválido" }, { status: 400 });
    }

    const reservationIndex = reservations.findIndex((res) => res.id === id);

    if (reservationIndex === -1) {
      return NextResponse.json({ message: "Reserva no encontrada" }, { status: 404 });
    }

    // Verificar si el usuario tiene permiso para cancelar la reserva
    if (reservations[reservationIndex].userId !== userId && userRole !== "admin") {
      return NextResponse.json({ message: "No autorizado" }, { status: 403 });
    }

    // Actualizar el estado de la reserva en lugar de eliminarla físicamente
    reservations[reservationIndex].status = "Cancelada";

    return NextResponse.json({ message: "Reserva cancelada con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}
