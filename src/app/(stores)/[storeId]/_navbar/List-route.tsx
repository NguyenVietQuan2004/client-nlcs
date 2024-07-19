"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function ListRoute() {
  const pathName = usePathname();
  const params = useParams();
  const Routes = [
    {
      href: `/`,
      active: pathName === `/${params.storeId}`,
      name: "Overview",
    },
    {
      href: `/${params.storeId}/settings`,
      active: pathName === `/${params.storeId}/settings`,
      name: "Settings",
    },
    {
      href: `/${params.storeId}/billboards`,
      active: pathName.startsWith(`/${params.storeId}/billboards`),
      name: "Billboards",
    },
  ];
  return (
    <>
      {Routes.map((route) => (
        <Link
          key={route.name}
          href={`${route.href}`}
          className={`${route.active ? "text-zinc-800 font-semibold" : "text-zinc-500"} mr-4 font-medium`}
        >
          {route.name}
        </Link>
      ))}
    </>
  );
}

export default ListRoute;
