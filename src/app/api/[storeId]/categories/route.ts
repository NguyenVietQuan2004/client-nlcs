import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  let listCategoryRes;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category/getall?storeId=${params.storeId}`, {
      cache: "no-cache",
    });
    listCategoryRes = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_CATEGORIES_ERROR", { status: 500 });
  }
  return Response.json({ ...listCategoryRes });
}
