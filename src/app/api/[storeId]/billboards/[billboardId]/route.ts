import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string; billboardId: string } }) {
  let billboard;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard?_id=${params.billboardId}&storeId=${params.storeId}`,
      {
        cache: "no-cache",
      }
    );
    billboard = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_BILLBOARDID_ERROR", { status: 500 });
  }
  return Response.json({ ...billboard });
}
