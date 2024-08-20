import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  let listSizeRes;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/size/getall?storeId=${params.storeId}`, {
      cache: "no-cache",
    });
    listSizeRes = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_SIZES_ERROR", { status: 500 });
  }

  return Response.json({ ...listSizeRes });
}
