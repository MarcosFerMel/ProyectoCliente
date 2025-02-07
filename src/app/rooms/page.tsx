"use client";

import { useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { FaWifi, FaTv, FaSnowflake, FaUtensils, FaBath } from "react-icons/fa";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { motion } from "framer-motion";

// Definir los tipos
type Room = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  status: string;
  images: string[];
  services: string[];
};

type User = {
  id: number;
  name: string;
};

type LightboxController = {
  toggler: boolean;
  slide: number;
  images: string[];
};

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [lightboxController, setLightboxController] = useState<LightboxController>({
    toggler: false,
    slide: 1,
    images: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsResponse = await fetch("/api/rooms");
        const usersResponse = await fetch("/api/users");
        const roomsData = await roomsResponse.json();
        const usersData = await usersResponse.json();
        setRooms(roomsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openLightbox = (images: string[], index: number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: index + 1,
      images: images,
    });
  };

  const handleReserve = async () => {
    if (!checkIn || !checkOut || !selectedUserId) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const reservation = {
        room: selectedRoom?.name,
        userId: selectedUserId,
        checkIn,
        checkOut,
        status: "Confirmada",
      };

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (response.ok) {
        alert("Reserva creada con éxito");
        setModalOpen(false);
        setCheckIn("");
        setCheckOut("");
      } else {
        alert("Hubo un error al crear la reserva.");
      }
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Nuestras Habitaciones</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              {/* Imagen Principal */}
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover cursor-pointer"
                  onClick={() => openLightbox(room.images, 0)}
                />
              </motion.div>

              <div className="p-4">
                <h2 className="text-2xl font-bold">{room.name}</h2>
                <p className="mt-2 text-gray-600">Capacidad: {room.capacity} personas</p>
                <p className="text-gray-600">Precio: {room.price} € / noche</p>
                <p className={`mt-2 font-semibold ${room.status === "Disponible" ? "text-green-600" : "text-red-600"}`}>
                  Estado: {room.status}
                </p>

                {/* Lista de Servicios */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Servicios:</h3>
                  <ul className="mt-2 grid grid-cols-2 gap-2 text-gray-700">
                    {room.services.map((service, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        {service === "WiFi" && <FaWifi className="text-blue-500" />}
                        {service === "TV" && <FaTv className="text-gray-600" />}
                        {service === "Aire Acondicionado" && <FaSnowflake className="text-blue-400" />}
                        {service === "Desayuno Incluido" && <FaUtensils className="text-yellow-500" />}
                        {service === "Baño Privado" && <FaBath className="text-blue-700" />}
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Galería de imágenes */}
                <div className="flex mt-4 space-x-2">
                  {room.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Vista ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => openLightbox(room.images, index)}
                    />
                  ))}
                </div>

                {/* Botón Reservar */}
                {room.status === "Disponible" ? (
                  <button
                    onClick={() => {
                      setSelectedRoom(room);
                      setModalOpen(true);
                    }}
                    className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    Reservar
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-4 w-full bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed"
                  >
                    Ocupada
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Galería Lightbox */}
      {lightboxController.images.length > 0 && (
        <FsLightbox
          toggler={lightboxController.toggler}
          sources={lightboxController.images}
          slide={lightboxController.slide}
        />
      )}

      {/* Modal para Reservar */}
      {modalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Reservar {selectedRoom.name}</h2>

            <label className="block mb-4">
              <span className="font-semibold">Seleccione Usuario:</span>
              <select value={selectedUserId || ""} onChange={(e) => setSelectedUserId(Number(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 mt-1">
                <option value="">Seleccione un usuario</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border rounded px-3 py-2" />
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={handleReserve} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">Confirmar Reserva</button>
              <button onClick={() => setModalOpen(false)} className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
