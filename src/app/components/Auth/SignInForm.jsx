"use client";
import { useState } from "react";
import classes from "./AuthForm.module.css";
import { userRequest, api } from "@/lib/lib";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/auth-slice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "../UI/Ui";

const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    const user = await userRequest(`${api}sign-in`, payload);
    if (user.id) {
      dispatch(authActions.login(user));
      router.push("/detect");
    } else {
      console.log("Something went wrong");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <section className={classes.auth}>
      <h1>Sign In</h1>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          value={email}
          label="Your Email"
          setChange={setEmail}
        />

        <Input
          type="password"
          value={password}
          label="Your Password"
          setChange={setPassword}
        />
        <div className={classes.actions}>
          <Button label="Login" />
          <Link href="/sign-up" className={classes.toggle}>
            Create new account
          </Link>

          {/* {isLoading && <p>sending request</p>} */}
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
