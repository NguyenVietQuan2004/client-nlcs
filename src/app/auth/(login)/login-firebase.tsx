"use client";

import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "@/firebase/config";
import { authApi } from "@/apiRequest/authAPI";
import { LoginResType } from "@/Type/AuthTypes";
import { FacebookIcon, GoogleIcon } from "../../../../public/icons/icons";
import { handlError } from "@/components/handle-error";

const googleProvider = new GoogleAuthProvider();
const faceobookProvider = new FacebookAuthProvider();

function LoginWithFirebase() {
  const handleLoginWithFirebase = async (provider: AuthProvider) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        // @ts-ignore
        const { accessToken, uid, displayName } = user;
        try {
          const result: LoginResType = await authApi.loginFirebase({
            id: uid,
            userName: displayName || "",
            accessToken,
          });
          await authApi.sendCookieToServer(result);
          localStorage.setItem("user", JSON.stringify(result.data.userName));
          // window.location.assign("/");
        } catch (error) {
          handlError({
            consoleError: "Error login with firebase to server",
            error,
          });
        }
      })
      .catch((error) => {
        handlError({
          consoleError: "Error login with firebase",
          error,
        });
      });
  };

  return (
    <div className=" flex justify-center flex-col w-[360px] text-[15px] items-center px-12 ">
      <button
        onClick={() => handleLoginWithFirebase(faceobookProvider)}
        className="w-full bg-[#0074e8] hover:opacity-90 flex items-center rounded-full p-2 px-3 font-medium text-white"
      >
        <div className="w-6 h-6 bg-white rounded-full mr-4 flex items-center justify-center pt-[5px] pl-1">
          <FacebookIcon />
        </div>
        Continue with Facebook
      </button>
      <button
        onClick={() => handleLoginWithFirebase(googleProvider)}
        className="mt-1 w-full border hover:bg-zinc-50  flex items-center rounded-full p-2 border-zinc-300 font-medium"
      >
        Continue with Google
        <div className="ml-auto w-6 h-6  rounded-full  flex items-center justify-center ">
          <GoogleIcon />
        </div>
      </button>
      <div className="text-sm underline text-blue-400 mt-8 ml-auto cursor-pointer hover:opacity-80">Quên mật khẩu?</div>
    </div>
  );
}

export default LoginWithFirebase;
