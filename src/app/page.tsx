"use client";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function Home() {
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        // @ts-ignore
        const token = user.accessToken;
        const id = user.uid;
        const userName = user.displayName;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/loginwithfirebase`, {
          method: "POST",
          body: JSON.stringify({ token, id, userName }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        // console.log("google auth: ", user);
      })
      .catch((error: any) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const handleLoginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        // @ts-ignore
        const token = user.accessToken;
        const id = user.uid;
        const userName = user.displayName;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/loginwithfirebase`, {
          method: "POST",
          body: JSON.stringify({ token, id, userName }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
      })
      .catch((error: any) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <button onClick={() => handleLoginWithGoogle()} className="bg-white text-black p-4">
        gogole login
      </button>
      <button onClick={() => handleLoginWithFacebook()} className="bg-white text-black p-4">
        facebook login
      </button>
    </div>
  );
}
