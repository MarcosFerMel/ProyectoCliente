let reservations = [
  {
    id: 1,
    room: "Habitación Doble",
    guestName: "Juan Pérez",
    checkIn: "2025-01-15",
    checkOut: "2025-01-17",
    status: "Confirmada",
    userId: 1, // Relacionada con el usuario Juan Pérez
  },
  {
    id: 2,
    room: "Suite Familiar",
    guestName: "María Gómez",
    checkIn: "2025-01-18",
    checkOut: "2025-01-22",
    status: "Cancelada",
    userId: 2, // Relacionada con el usuario María Gómez
  },
];

export async function GET(request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (userId) {
    // Filtrar las reservas por usuario si se proporciona un userId
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
  reservations.push(newReservation);

  return new Response(JSON.stringify(newReservation), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
