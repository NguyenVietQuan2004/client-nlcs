import { ListStoreResType } from "@/app/Type/AuthTypes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;
    console.log("sèalkfjsuihdssdfsd", cookieStore.getAll());
    if (!sessionToken) {
      return NextResponse.json("You are not authenticated!", {
        status: 403,
      });
    }
    const response = await fetch("http://localhost:5000/store/getall", {
      headers: {
        Cookie: `sessionToken=${sessionToken}`,
      },
    });
    const data: ListStoreResType = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET_API_STORES_ERROR", error);
    return new NextResponse("GET_API_STORES_ERROR", {
      status: 400,
    });
  }
}
