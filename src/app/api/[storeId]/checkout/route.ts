import { stripe } from "@/lib/stripe";
import { productOrderType } from "@/Type/OrderTypes";
import { NextResponse } from "next/server";
import Stripe from "stripe";
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
  let session: Stripe.Checkout.Session | undefined;
  try {
    const order = await request.json();
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
          unit_amount: (objectPrice?.price || 0) * (productOrder.product.sale ? 100 - productOrder.product.sale : 1),
        },
        quantity: productOrder.amount,
      });
    });
    const data = {
      storeId: params.storeId,
      isPaid: false,
      paid_at: null,
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
    if (!response.ok) {
      throw orderCreate;
    }

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
    setTimeout(async () => {
      await stripe.checkout.sessions.expire(session?.id || "");
    }, 60 * 2000);
  } catch (error: any) {
    if (error.statusCode === 401) {
      return NextResponse.json(
        { ...error },
        {
          status: 401,
          headers: corsHeader,
        }
      );
    }
  }

  return NextResponse.json(
    { url: session?.url || "url null" },
    {
      status: 200,
      headers: corsHeader,
    }
  );
}
