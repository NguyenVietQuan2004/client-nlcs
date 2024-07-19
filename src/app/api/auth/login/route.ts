export async function POST(req: Request) {
  const data = await req.json();
  const accessToken = data.data.accessToken;
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  return Response.json(
    { ...data },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${accessToken}; Path=/; HttpOnly; Expires=${oneYearFromNow.toUTCString()} ;Secure; Partitioned;SameSite=None`,
        "Content-Type": "application/json",
      },
    }
  );
}
