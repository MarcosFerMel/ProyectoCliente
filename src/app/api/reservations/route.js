export async function GET(request) {
    const reservations = [
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
  
    return new Response(JSON.stringify(reservations), {
      headers: { "Content-Type": "application/json" },
    });
  }
  