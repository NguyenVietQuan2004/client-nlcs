import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  let listBillboardRes;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard/getall?storeId=${params.storeId}`, {
      cache: "no-cache",
    });
    listBillboardRes = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_BILLBOARDs_ERROR", { status: 500 });
  }
  return Response.json({ ...listBillboardRes });
}
