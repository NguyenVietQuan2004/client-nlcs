import { NextResponse, type NextRequest } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { storeId: String } }) {
  let store;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store?_id=${params.storeId}`, {
      cache: "no-cache",
    });
    store = await response.json();
    console.log("store", store);
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_GETSTORE_ERROR", { status: 500 });
  }
  return Response.json({ ...store });
}
