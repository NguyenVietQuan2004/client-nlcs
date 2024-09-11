"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  BillboardIcon,
  CategoryIcon,
  ColorIcon,
  HomeIcon,
  OrderIcon,
  ProductIcon,
  SettingIcon,
  SizeIcon,
} from "../../../../../public/icons/icons";
import React, { SetStateAction } from "react";

function ListRoute({ setIsShowModal }: { setIsShowModal?: React.Dispatch<SetStateAction<boolean>> }) {
  const pathName = usePathname();
  const params = useParams();
  const Routes = [
    {
      href: `/`,
      active: pathName === `/${params.storeId}`,
      name: "Overview",
      icon: <HomeIcon />,
    },
    {
      href: `/${params.storeId}/billboards`,
      active: pathName.startsWith(`/${params.storeId}/billboards`),
      name: "Billboards",
      icon: <BillboardIcon />,
    },
    {
      href: `/${params.storeId}/previewstore`,
      active: pathName.startsWith(`/${params.storeId}/previewstore`),
      name: "PreviewStore",
      icon: <BillboardIcon />,
    },
    {
      href: `/${params.storeId}/categories`,
      active: pathName.startsWith(`/${params.storeId}/categories`),
      name: "Categories",
      icon: <CategoryIcon />,
    },
    {
      href: `/${params.storeId}/sizes`,
      active: pathName.startsWith(`/${params.storeId}/sizes`),
      name: "Sizes",
      icon: <SizeIcon />,
    },
    {
      href: `/${params.storeId}/colors`,
      active: pathName.startsWith(`/${params.storeId}/colors`),
      name: "Colors",
      icon: <ColorIcon />,
    },
    {
      href: `/${params.storeId}/products`,
      active: pathName.startsWith(`/${params.storeId}/products`),
      name: "Products",
      icon: <ProductIcon />,
    },
    {
      href: `/${params.storeId}/orders`,
      active: pathName.startsWith(`/${params.storeId}/orders`),
      name: "Orders",
      icon: <OrderIcon />,
    },
    {
      href: `/${params.storeId}/settings`,
      active: pathName === `/${params.storeId}/settings`,
      name: "Settings",
      icon: <SettingIcon />,
    },
  ];
  return (
    <>
      {Routes.map((route, index) => (
        <Link
          onClick={() => setIsShowModal && setIsShowModal(false)}
          key={route.name}
          href={`${index === 0 ? `/${params.storeId}/${route.href}` : `${route.href}`}`}
          className={`${
            route.active ? "text-zinc-800  font-semibold" : "text-zinc-500"
          } lg:mr-4 font-medium px-3 py-3 lg:p-0 flex items-center lg:block`}
        >
          <div className="lg:hidden mr-2">{route.icon}</div>

          {route.name}
        </Link>
      ))}
    </>
  );
}

export default ListRoute;
