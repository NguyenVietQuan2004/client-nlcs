import Link from "next/link";
import LoginClient from "./LoginClient";
import LoginFirebase from "./LoginFirebase";

function Login() {
  return (
    <div>
      <Link href="/">home page</Link>
      <LoginClient />
      {/* <LoginFirebase /> */}
    </div>
  );
}

export default Login;
