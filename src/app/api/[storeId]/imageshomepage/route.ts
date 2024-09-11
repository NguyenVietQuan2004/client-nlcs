import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  let ImagesHomePate;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/imageshomepage?storeId=${params.storeId}`, {
      cache: "no-cache",
    });
    ImagesHomePate = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_IMAGESHOMEPAGE_ERROR", { status: 500 });
  }
  return Response.json({ ...ImagesHomePate });
}
