import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string; colorId: string } }) {
  let color;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/color?_id=${params.colorId}&storeId=${params.storeId}`,
      {
        cache: "no-cache",
      }
    );
    color = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_COLORID_ERROR", { status: 500 });
  }
  return Response.json({ ...color });
}
