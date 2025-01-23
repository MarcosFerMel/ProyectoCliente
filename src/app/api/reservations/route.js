let reservations = [
  {
    id: 1,
    room: "Habitación Doble",
    guestName: "Juan Pérez",
    checkIn: "2025-01-15",
    checkOut: "2025-01-17",
    status: "Confirmada",
  },
  {
    id: 2,
    room: "Suite Familiar",
    guestName: "María Gómez",
    checkIn: "2025-01-18",
    checkOut: "2025-01-22",
    status: "Cancelada",
  },
];

export async function GET(request) {
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
