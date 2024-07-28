import { type NextRequest } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { storeId: string; categoryId: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/category?_id=${params.categoryId}&storeId=${params.storeId}`
  );
  const category = await response.json();
  return Response.json({ category });
}
