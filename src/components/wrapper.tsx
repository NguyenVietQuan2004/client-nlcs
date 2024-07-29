import { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="px-10 pt-4 ">{children}</div>;
}

export default Wrapper;
