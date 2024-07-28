export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/size/getall?storeId=${params.storeId}`);
  const listSizeRes = await response.json();
  return Response.json({ listSizeRes });
}
