"use client";
import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { authActions } from "@/store/auth-slice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const MainNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authActions.logout());
    router.push("/");
  };
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Detect Faces</div>
      </Link>
      <nav>
        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <Link href="/sign-in">Login</Link>
              </li>
              <li>
                <Link href="/sign-up">Register</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
