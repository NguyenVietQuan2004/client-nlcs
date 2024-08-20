import queryString from "query-string";
import { NextRequest, NextResponse } from "next/server";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: corsHeader,
    }
  );
}

export async function GET(req: NextRequest, { params }: { params: { storeId: string } }) {
  const searchParams = req.nextUrl.searchParams;
  const query: any = {
    storeId: params.storeId,
    isArchive: false,
  };

  Array.from(searchParams.entries()).forEach(([key, value]) => {
    query[key] = value === "undefined" ? null : value;
  });
  query["limit"] = searchParams.get("limit");
  query["page"] = searchParams.get("page");

  const url = queryString.stringifyUrl(
    {
      url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/product/getall`,
      query,
    },
    { skipNull: true }
  );
  let listProductRes;
  try {
    const response = await fetch(url, {
      cache: "no-cache",
    });
    listProductRes = await response.json();
  } catch (error) {
    return new NextResponse("ROUTEHANDLER_PRODUCTS_ERROR", { status: 500 });
  }
  return Response.json(
    { ...listProductRes },
    {
      headers: corsHeader,
    }
  );
}
