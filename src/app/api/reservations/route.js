import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = "mi_secreto_super_seguro";

let reservations = [
  { id: 1, room: "Habitación Doble", guestName: "Juan Pérez", checkIn: "2025-01-15", checkOut: "2025-01-17", status: "Pendiente", userId: 1 },
  { id: 2, room: "Suite Familiar", guestName: "María Gómez", checkIn: "2025-01-18", checkOut: "2025-01-22", status: "Confirmada", userId: 2 },
];

// 📌 Obtener reservas
export async function GET(request) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) return NextResponse.json({ message: "No autenticado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { id: userId, role: userRole } = decoded;

    const { searchParams } = new URL(request.url);
    const requestedUserId = searchParams.get("userId");

    if (userRole === "admin") {
      if (requestedUserId) {
        const userReservations = reservations.filter(res => res.userId === Number(requestedUserId));
        return NextResponse.json(userReservations);
      }
      return NextResponse.json(reservations);
    }

    return NextResponse.json(reservations.filter((res) => res.userId === userId));
  } catch (error) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}

// 📌 Crear nueva reserva
export async function POST(request) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) return NextResponse.json({ message: "No autenticado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { id: userId, name } = decoded;

    const { room, checkIn, checkOut } = await request.json();

    if (!room || !checkIn || !checkOut) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const newReservation = {
      id: reservations.length + 1,
      room,
      guestName: name,
      checkIn,
      checkOut,
      status: "Pendiente",
      userId,
    };

    reservations.push(newReservation);

    return NextResponse.json({ message: "Reserva creada con éxito", reservation: newReservation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al procesar la reserva" }, { status: 500 });
  }
}

// 📌 Actualizar estado de reserva (Solo Admins)
export async function PUT(request) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) return NextResponse.json({ message: "No autenticado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== "admin") return NextResponse.json({ message: "No autorizado" }, { status: 403 });

    const { id, status } = await request.json();
    const reservationId = Number(id);

    const index = reservations.findIndex((res) => res.id === reservationId);

    if (index === -1) return NextResponse.json({ message: "Reserva no encontrada" }, { status: 404 });

    reservations[index].status = status;

    return NextResponse.json({
      message: "Estado actualizado",
      updatedReservation: reservations[index],
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error al procesar la actualización" }, { status: 500 });
  }
}
