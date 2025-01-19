export default function Rooms() {
    // Datos simulados de habitaciones
    const rooms = [
      { id: 1, name: "Habitación Doble", capacity: 2, price: 80, status: "Disponible" },
      { id: 2, name: "Suite Familiar", capacity: 4, price: 150, status: "Ocupada" },
      { id: 3, name: "Habitación Individual", capacity: 1, price: 50, status: "Disponible" },
    ];
  
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto">
          {/* Título */}
          <h1 className="text-3xl font-bold text-center mb-8">Habitaciones Disponibles</h1>
  
          {/* Listado de habitaciones */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <h2 className="text-xl font-bold">{room.name}</h2>
                <p className="mt-2">Capacidad: {room.capacity} personas</p>
                <p>Precio: ${room.price} / noche</p>
                <p className={`mt-2 ${room.status === "Disponible" ? "text-green-600" : "text-red-600"}`}>
                  Estado: {room.status}
                </p>
                {room.status === "Disponible" ? (
                  <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Reservar
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-4 bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed"
                  >
                    Ocupada
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  