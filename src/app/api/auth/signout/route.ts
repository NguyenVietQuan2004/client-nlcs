export async function POST() {
  return Response.json(
    {},
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly ;Secure; Partitioned;SameSite=None`,
        "Content-Type": "application/json",
      },
    }
  );
}
