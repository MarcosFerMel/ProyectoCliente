import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import users from "./users";

// Clave secreta para JWT
const SECRET_KEY = "mi_secreto_super_seguro";

// Login: Verifica credenciales y genera un token
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

  // Generar token JWT con rol de usuario
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  // Guardar token en una cookie segura
  const response = NextResponse.json({ message: "Login exitoso" });
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    sameSite: "strict",
  });

  return response;
}

// Autenticación: Verifica el token y devuelve los datos del usuario
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

// Logout: Elimina la cookie de autenticación
export async function DELETE(request) {
  const response = NextResponse.json({ message: "Logout exitoso" });
  response.cookies.set("auth_token", "", { maxAge: 0 });

  return response;
}
