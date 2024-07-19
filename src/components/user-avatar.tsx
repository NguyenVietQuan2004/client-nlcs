"use client";

import { useEffect, useState } from "react";
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
    <div className="w-8 h-8  rounded-full bg-blue-400 flex justify-center text-white items-center">{userName}</div>
  );
}

export default UserAvatar;
