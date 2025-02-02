import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import users from "./users";

// Clave secreta para JWT
const SECRET_KEY = "mi_secreto_super_seguro";

export async function POST(request) {
  const { email, password } = await request.json();

  // Buscar usuario por email
  const user = users.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 401 });
  }

  // Verificar contraseña
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
  }

  // Generar token JWT
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  // Guardar token en una cookie segura
  const response = NextResponse.json({ message: "Login exitoso" });
  response.cookies.set("auth_token", token, { httpOnly: true, maxAge: 3600 });

  return response;
}

export async function GET(request) {
  // Obtener el token desde las cookies
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json(decoded);
  } catch (error) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}

export async function DELETE(request) {
  // Eliminar la cookie de autenticación (logout)
  const response = NextResponse.json({ message: "Logout exitoso" });
  response.cookies.set("auth_token", "", { maxAge: 0 });

  return response;
}
