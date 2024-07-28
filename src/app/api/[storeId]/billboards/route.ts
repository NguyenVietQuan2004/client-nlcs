export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard/getall?storeId=${params.storeId}`);
  const listBillboardRes = await response.json();
  return Response.json({ listBillboardRes });
}
