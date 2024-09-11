import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string; sizeId: string } }) {
  let size;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/size?_id=${params.sizeId}&storeId=${params.storeId}`,
      {
        cache: "no-cache",
      }
    );
    size = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_SIZEID_ERROR", { status: 500 });
  }
  return Response.json({ ...size });
}
