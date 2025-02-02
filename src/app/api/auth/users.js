import bcrypt from "bcryptjs";

// Lista simulada de usuarios con roles
let users = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "cliente",
  },
  {
    id: 2,
    name: "María Gómez",
    email: "maria@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "cliente",
  },
  {
    id: 3,
    name: "Admin",
    email: "admin@altosdelasierra.com",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
  },
];

export default users;
