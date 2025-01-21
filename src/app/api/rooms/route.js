
export async function GET(request) {
    const rooms = [
      { id: 1, name: "Habitación Doble", capacity: 2, price: 80, status: "Disponible" },
      { id: 2, name: "Suite Familiar", capacity: 4, price: 150, status: "Ocupada" },
      { id: 3, name: "Habitación Individual", capacity: 1, price: 50, status: "Disponible" },
    ];
  
    return new Response(JSON.stringify(rooms), {
      headers: { "Content-Type": "application/json" },
    });
  }
  