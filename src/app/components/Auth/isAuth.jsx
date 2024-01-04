// isAuth.tsx

"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component) {
  return function IsAuth(props) {
    //const auth = isAuthenticated;
    const auth = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
      if (!auth) {
        return redirect("/sign-in");
      }
    }, [auth]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
