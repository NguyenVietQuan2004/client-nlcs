import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string; categoryId: string } }) {
  let category;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/category?_id=${params.categoryId}&storeId=${params.storeId}`,
      {
        cache: "no-cache",
      }
    );
    category = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_CATEGORYID_ERROR", { status: 500 });
  }
  return Response.json({ ...category });
}
