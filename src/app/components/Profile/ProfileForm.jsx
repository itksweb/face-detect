import { useRef } from "react";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const passRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const newPassword = passRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCw9mzhZv3mXlvY8soe2Jjo0VNC7Njo3As",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: "token",
          password: newPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {});
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
