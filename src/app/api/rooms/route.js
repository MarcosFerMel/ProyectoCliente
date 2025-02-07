export async function GET(request) {
  const rooms = [
    { 
      id: 1, 
      name: "Habitación Doble", 
      capacity: 2, 
      price: 80, 
      status: "Disponible", 
      images: [
        "/images/rooms/habitacion1.jpeg",
        "/images/rooms/habitacion1a.jpeg",
        "/images/rooms/habitacion1b.jpeg"
      ],
      services: ["WiFi", "TV", "Baño Privado", "Aire Acondicionado","Desayuno Incluido"]
    },
    { 
      id: 2, 
      name: "Suite Familiar", 
      capacity: 4, 
      price: 150, 
      status: "Disponible", 
      images: [
        "/images/rooms/habitacion2.jpeg",
        "/images/rooms/habitacion2a.jpeg",
        "/images/rooms/habitacion2b.jpeg"
      ],
      services: ["WiFi", "Aire Acondicionado", "TV", "Cocina", "Baño Compartido"]
    },
    { 
      id: 3, 
      name: "Habitación Individual", 
      capacity: 1, 
      price: 50, 
      status: "Disponible", 
      images: [
        "/images/rooms/habitacion3.jpeg",
        "/images/rooms/habitacion3a.jpeg",
        "/images/rooms/habitacion3b.jpeg"
      ],
      services: ["WiFi", "TV", "Baño Privado", "Aire Acondicionado","Desayuno Incluido"]
    }
  ];

  return new Response(JSON.stringify(rooms), {
    headers: { "Content-Type": "application/json" },
  });
}
