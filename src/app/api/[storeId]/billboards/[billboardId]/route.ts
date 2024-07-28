import { type NextRequest } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { storeId: string; billboardId: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard?_id=${params.billboardId}&storeId=${params.storeId}`
  );
  const billboard = await response.json();
  return Response.json({ billboard });
}
