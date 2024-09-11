"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { authApi } from "@/apiRequest/authAPI";
import { handlError } from "@/components/handle-error";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function UserAvatar() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const nameJson = localStorage.getItem("user");
      if (nameJson) {
        setUserName(() => {
          const fullName = JSON.parse(nameJson);
          const nameArray = fullName.split(" ");
          return nameArray[0][0];
        });
      }
    }
  }, []);
  const handleSignOut = async () => {
    try {
      await authApi.signOut();
      await authApi.signOutNextServer();

      router.refresh();
    } catch (error) {
      handlError({ consoleError: "SIGNOUT_ERROR", error });
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className=" w-8 h-8 cursor-default rounded-full bg-blue-400 flex justify-center text-white items-center">
          {userName}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Button
          className={buttonVariants({
            variant: "outline",
            className: "text-black",
          })}
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default UserAvatar;
