"use client";
import { useRef } from "react";
import classes from "./ImageLinkForm.module.css";
import { detectActions } from "@/store/detect-slice";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store/auth-slice";

const ImageLinkForm = () => {
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const imageUrlRef = useRef();

  const urlInput = (e) => {
    dispatch(detectActions.updateFaceLocation());
    const imgUrl = imageUrlRef.current.value;
    dispatch(detectActions.setImage(imgUrl));
  };
  const updateEntries = () => {
    fetch("/api/image", {
      method: "PUT",
      body: JSON.stringify({ id: profile.id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => dispatch(authActions.setProfile(data)));
  };

  const handleDetect = (e) => {
    e.preventDefault();
    const imgUrl = imageUrlRef.current.value;

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ imgUrl: imgUrl }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/detect", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(detectActions.updateFaceLocation(result));
        updateEntries();
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <main className={classes.authe}>
      <p>
        This magic brain will detect faces in your pictures. Give it a try now
      </p>
      <form onSubmit={handleDetect} className="detectForm">
        <input type="text" id="imgUrl" ref={imageUrlRef} onChange={urlInput} />
        <button>detect</button>
      </form>
    </main>
  );
};

export default ImageLinkForm;
