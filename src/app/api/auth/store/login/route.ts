export async function POST(req: Request) {
  const data = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
    method: "POST",
    body: data,
  });
  const loginRes = await response.json();
  console.log(loginRes, "login respone");
  return Response.json(loginRes);
}
