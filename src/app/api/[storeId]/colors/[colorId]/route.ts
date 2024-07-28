import { type NextRequest } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { storeId: string; colorId: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/color?_id=${params.colorId}&storeId=${params.storeId}`
  );
  const color = await response.json();
  return Response.json({ color });
}
