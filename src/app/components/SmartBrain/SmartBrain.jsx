"use client";
import FaceRecognition from "./FaceRecognition";
import classes from "./SmartBrain.module.css";
import ImageLinkForm from "./ImageLinkForm";
import User from "./User";
import isAuth from "../Auth/isAuth";

const SmartBrain = () => {
  return (
    <main className={classes.authe}>
      <User />
      <ImageLinkForm />
      <FaceRecognition />
    </main>
  );
};

export default isAuth(SmartBrain);
