export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/color/getall?storeId=${params.storeId}`);
  const listColorRes = await response.json();
  return Response.json({ listColorRes });
}
