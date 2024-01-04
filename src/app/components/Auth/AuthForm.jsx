"use client";
import { useState } from "react";
import classes from "./AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
//import { authActions } from "../../store/auth-slice";
import { authActions } from "@/store/auth-slice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LOGIN_URL = "/api/sign-in";
const SIGNUP_URL = "/api/sign-up";

const AuthForm = () => {
  const router = useRouter();
  const { isLogin, isAuthenticated, profile } = useSelector(
    (state) => state.auth
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  let url = isLogin ? LOGIN_URL : SIGNUP_URL;

  const switchAuthModeHandler = () => {
    dispatch(authActions.switchForm(isLogin ? false : true));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let payload = isLogin ? { email, password } : { name, email, password };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          dispatch(authActions.login(user));
          router.push("/detect");
        }
      });
    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button onClick={submitHandler}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <Link href={isLogin ? "/sign-up" : "/sign-in"}>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </Link>

          {/* {isLoading && <p>sending request</p>} */}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
