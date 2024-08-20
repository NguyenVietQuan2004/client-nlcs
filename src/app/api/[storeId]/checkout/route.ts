import { stripe } from "@/lib/stripe";
import { productOrderType } from "@/Type/OrderTypes";
import { NextResponse } from "next/server";

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

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
  let session;
  try {
    const order = await request.json();
    console.log(order);
    if (!order) {
      return new Response("Order is empty", { status: 400 });
    }
    const line_items: any = [];

    order.forEach((productOrder: productOrderType) => {
      const objectPrice = productOrder.product.arrayPrice.find((item: any) => item.size === productOrder.size);
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: productOrder.product.name,
          },
          unit_amount: (objectPrice?.price || 0) * 100,
        },
        quantity: productOrder.amount,
      });
    });
    const data = {
      storeId: params.storeId,
      isPaid: false,
      listProductOrder: [
        ...order.map((item: productOrderType) => ({
          _id: item.product._id,
          size: item.size,
          color: item.color,
          amount: item.amount,
        })),
      ],
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    const orderCreate = await response.json();
    session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_API_STORE}/cart?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_STORE}/cart?canceled=1`,
      metadata: {
        orderId: orderCreate.data._id,
      },
    });
  } catch (error) {}

  return NextResponse.json(
    { url: session?.url },
    {
      status: 200,
      headers: corsHeader,
    }
  );
}
