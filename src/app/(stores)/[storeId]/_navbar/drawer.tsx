import Image from "next/image";

import {
  DrawerTitle,
  DrawerClose,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
  Drawer as DrawerShadcn,
} from "@/components/ui/drawer";
import ListRoute from "@/app/(stores)/[storeId]/_navbar/List-route";
import { CloseIcon, MenuIcon } from "../../../../../public/icons/icons";
function Drawer() {
  return (
    <DrawerShadcn>
      <DrawerTrigger>
        {" "}
        <div className=" lg:hidden flex h-8 w-8 items-center justify-center rounded-sm border">
          <MenuIcon />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle></DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <DrawerHeader className="flex items-center justify-between">
          <div className={`h-12 w-12 `}>
            <Image
              priority
              alt=""
              src="/images/hange.png"
              className="h-full w-full object-cover select-none"
              width={300}
              height={300}
            />
          </div>
          <div>
            <DrawerClose>
              <CloseIcon />
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="flex flex-col p-3">
          <ListRoute />
        </div>
      </DrawerContent>
    </DrawerShadcn>
  );
}

export default Drawer;
