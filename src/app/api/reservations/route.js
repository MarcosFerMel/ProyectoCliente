import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = "mi_secreto_super_seguro";

let reservations = [
  { id: 1, room: "Habitación Doble", guestName: "Juan Pérez", checkIn: "2025-01-15", checkOut: "2025-01-17", status: "Pendiente", userId: 1 },
  { id: 2, room: "Suite Familiar", guestName: "María Gómez", checkIn: "2025-01-18", checkOut: "2025-01-22", status: "Confirmada", userId: 2 },
];

// Obtener reservas (Usuarios ven solo sus reservas, Admins ven todas)
export async function GET(request) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) return NextResponse.json({ message: "No autenticado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { id: userId, role: userRole } = decoded;

    if (userRole === "admin") return NextResponse.json(reservations);

    return NextResponse.json(reservations.filter((res) => res.userId === userId));
  } catch (error) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}

// Actualizar estado de reserva (Solo Admins)
export async function PUT(request) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) return NextResponse.json({ message: "No autenticado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== "admin") return NextResponse.json({ message: "No autorizado" }, { status: 403 });

    const { id, status } = await request.json();
    const index = reservations.findIndex((res) => res.id === id);

    if (index === -1) return NextResponse.json({ message: "Reserva no encontrada" }, { status: 404 });

    reservations[index].status = status;
    return NextResponse.json({ message: "Estado actualizado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}
