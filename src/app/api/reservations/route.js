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

export async function GET(request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (userId) {
    const userReservations = reservations.filter(
      (reservation) => reservation.userId === parseInt(userId, 10)
    );
    return new Response(JSON.stringify(userReservations), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(reservations), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const newReservation = await request.json();
  newReservation.id = reservations.length + 1; // Generar un ID único
  newReservation.status = "Confirmada"; // Por defecto, la reserva está confirmada
  reservations.push(newReservation);

  return new Response(JSON.stringify(newReservation), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

// NUEVO: API para eliminar reservas
export async function DELETE(request) {
  const url = new URL(request.url);
  const id = parseInt(url.searchParams.get("id") || "0", 10);

  if (!id) {
    return new Response(
      JSON.stringify({ message: "ID de reserva inválido" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const reservationIndex = reservations.findIndex((res) => res.id === id);
  if (reservationIndex === -1) {
    return new Response(
      JSON.stringify({ message: "Reserva no encontrada" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // Actualizar el estado de la reserva en lugar de eliminarla físicamente
  reservations[reservationIndex].status = "Cancelada";

  return new Response(
    JSON.stringify({ message: "Reserva cancelada con éxito" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
