"use client";

import { useEffect, useState } from "react";

// Definir el tipo para un usuario
type User = {
  id: number;
  name: string;
  email: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Llamar a la API para obtener usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Registrar un nuevo usuario
  const handleAddUser = async () => {
    if (!name || !email) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const newUser = { name, email };
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsers((prev) => [...prev, createdUser]); // Actualizar la lista de usuarios
        setName("");
        setEmail("");
        alert("Usuario registrado con éxito");
      } else {
        alert("Hubo un error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Cargando usuarios...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Gestión de Usuarios</h1>

        {/* Formulario para agregar usuario */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Registrar Nuevo Usuario</h2>
          <div className="mb-4">
            <label className="block mb-2">Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            onClick={handleAddUser}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Registrar Usuario
          </button>
        </div>

        {/* Listado de usuarios */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Usuarios Registrados</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-2">
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
