export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category/getall?storeId=${params.storeId}`);
  const listCategoryRes = await response.json();
  return Response.json({ listCategoryRes });
}
