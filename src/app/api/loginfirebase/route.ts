export async function POST(req: Request) {
  const data = await req.json();
  const response = await fetch("http://localhost:5000/auth/loginwithfirebase", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await response.json();
  console.log(result);
  return Response.json({ data });
}
