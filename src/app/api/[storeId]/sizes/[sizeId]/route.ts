import { type NextRequest } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { storeId: string; sizeId: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/size?_id=${params.sizeId}&storeId=${params.storeId}`
  );
  const size = await response.json();
  return Response.json({ size });
}
