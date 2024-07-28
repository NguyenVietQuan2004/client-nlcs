import { type NextRequest } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { storeId: string; productId: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/product?_id=${params.productId}&storeId=${params.storeId}`
  );
  const product = await response.json();
  return Response.json({ product });
}
