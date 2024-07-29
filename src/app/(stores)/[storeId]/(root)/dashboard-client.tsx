"use client";

import { CreditCard, DollarSign, Package } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import Heading from "@/components/heading";
import { ProductType } from "@/Type/ProductType";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderType } from "@/Type/OrderTypes";

function DashboardClient({
  dataOverview,
}: {
  dataOverview: { listOrderPaid: OrderType[]; countProductsInStock: number };
}) {
  let revenue = 0;
  const sales = dataOverview.listOrderPaid.length;
  const numberProductsInStock = dataOverview.countProductsInStock;
  console.log(dataOverview.listOrderPaid[0]);
  const revenueMonth = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // duyệt qua list order để tính doanh thu tổng và doanh thu từng tháng
  for (let i = 0; i < dataOverview.listOrderPaid.length; i++) {
    const month = new Date(dataOverview.listOrderPaid[i].createdAt).getMonth();
    let temp = 0;
    temp = dataOverview.listOrderPaid[i].listProductOrder.reduce((acc: any, order: any) => {
      const sizeUserSelect = order.size;
      const product: ProductType = order._id[0];
      const objectPrice = product.arrayPrice.find((objectPrice) => objectPrice.size === sizeUserSelect);
      return acc + (objectPrice?.price || 0);
    }, 0);
    revenue += temp;
    revenueMonth[month].total += temp;
  }

  return (
    <div>
      <Heading title="Dashboard" description="Overview of your store" />
      <div className="pt-4 border-b"></div>
      <div className="grid grid-cols-3 gap-x-4 pt-4">
        <Card className="flex justify-between items-start p-6">
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-medium">Total revenue</CardTitle>
            </CardHeader>
            <CardContent className="font-semibold text-lg p-0 pt-2">${revenue}</CardContent>
          </div>
          <div>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </div>
        </Card>
        <Card className="flex justify-between items-start p-6">
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
            </CardHeader>
            <CardContent className="font-semibold text-lg p-0 pt-2">+{sales}</CardContent>
          </div>
          <div>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </div>
        </Card>
        <Card className="flex justify-between items-start p-6">
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-sm font-medium">Product in stock</CardTitle>
            </CardHeader>
            <CardContent className="font-semibold text-lg p-0 pt-2">{numberProductsInStock}</CardContent>
          </div>
          <div>
            <Package className="w-4 h-4 text-muted-foreground" />
          </div>
        </Card>
      </div>
      <Card className="flex justify-between items-start flex-col p-6 mt-6 ">
        <CardHeader className="p-0">
          <CardTitle className="text-sm font-semibold pb-8">Overview</CardTitle>
        </CardHeader>
        <CardContent className="font-semibold text-lg p-0 pt-2 w-full">
          <ResponsiveContainer width={"100%"} height={350}>
            <BarChart data={revenueMonth}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#333"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardClient;
