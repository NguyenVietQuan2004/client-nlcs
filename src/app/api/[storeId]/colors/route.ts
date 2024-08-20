import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  let listColorRes;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/color/getall?storeId=${params.storeId}`, {
      cache: "no-cache",
    });
    listColorRes = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_COLORS_ERROR", { status: 500 });
  }
  return Response.json({ ...listColorRes });
}
