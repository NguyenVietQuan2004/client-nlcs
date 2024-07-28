export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/product/getall?storeId=${params.storeId}`);
  const listProductRes = await response.json();
  return Response.json({ listProductRes });
}
