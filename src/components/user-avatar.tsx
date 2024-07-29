"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
function UserAvatar() {
  const [userName, setUserName] = useState("");
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
  return (
    <div className="relative w-8 h-8  rounded-full bg-blue-400 flex justify-center text-white items-center">
      {userName}

      <div className="absolute top-[70%] right-6  bg-zinc-100 shadow-lg ">
        <Button
          className={buttonVariants({
            variant: "outline",
            className: "text-black",
          })}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}

export default UserAvatar;
