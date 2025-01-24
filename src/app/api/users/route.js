let users = [
    { id: 1, name: "Juan Pérez", email: "juan.perez@example.com" },
    { id: 2, name: "María Gómez", email: "maria.gomez@example.com" },
  ];
  
  export async function GET(request) {
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  }
  
  export async function POST(request) {
    const newUser = await request.json();
    newUser.id = users.length + 1; // Generar un ID único
    users.push(newUser);
  
    return new Response(JSON.stringify(newUser), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  }
  