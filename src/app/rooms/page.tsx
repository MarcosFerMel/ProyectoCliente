"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { FaWifi, FaTv, FaSnowflake, FaUtensils, FaBath } from "react-icons/fa";
import LoadingSpinner from "@/app/components/LoadingSpinner";

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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Nuestras Habitaciones
        </motion.h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
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

                {/* Botón Reservar con Animación */}
                {room.status === "Disponible" ? (
                  <motion.button
                    onClick={() => {
                      setSelectedRoom(room);
                      setModalOpen(true);
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    Reservar
                  </motion.button>
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
    </div>
  );
}
