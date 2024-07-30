// "use client";

// import { useEffect, useState } from "react";
// import { Button, buttonVariants } from "./ui/button";
// import { authApi } from "@/apiRequest/authAPI";
// import { useRouter } from "next/navigation";
// import { handlError } from "./handle-error";
// function UserAvatar() {
//   const [userName, setUserName] = useState("");
//   const router = useRouter();
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const nameJson = localStorage.getItem("user");
//       if (nameJson) {
//         setUserName(() => {
//           const fullName = JSON.parse(nameJson);
//           const nameArray = fullName.split(" ");
//           return nameArray[0][0];
//         });
//       }
//     }
//   }, []);
//   const handleSignOut = async () => {
//     try {
//       await authApi.signOut();
//       await authApi.signOutNextServer();

//       router.refresh();
//     } catch (error) {
//       handlError({ consoleError: "SIGNOUT_ERROR", error });
//     }
//   };
//   return (
//     <div className="relative w-8 h-8  rounded-full bg-blue-400 flex justify-center text-white items-center">
//       {userName}

//       <div className="absolute top-[70%] right-6  bg-zinc-100 shadow-lg ">
//         <Button
//           className={buttonVariants({
//             variant: "outline",
//             className: "text-black",
//           })}
//           onClick={handleSignOut}
//         >
//           Sign out
//         </Button>

//       </div>
//     </div>
//   );
// }

// export default UserAvatar;

"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { authApi } from "@/apiRequest/authAPI";
import { useRouter } from "next/navigation";
import { handlError } from "./handle-error";
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
