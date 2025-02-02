import bcrypt from "bcryptjs";

// Lista simulada de usuarios
let users = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    password: bcrypt.hashSync("123456", 10), // Contraseña encriptada
  },
  {
    id: 2,
    name: "María Gómez",
    email: "maria@example.com",
    password: bcrypt.hashSync("password", 10),
  },
];

export default users;
