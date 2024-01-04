"use client";
import { useEffect, useState } from "react";
import classes from "./ImageLinkForm.module.css";
import { detectActions } from "@/store/detect-slice";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store/auth-slice";
import api from "@/lib/lib";

const ImageLinkForm = () => {
  const [imageUrl, setIamgeUrl] = useState("");
  // const [imag, setImag] = useState(false);
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onInputChange = async (e) => {
    setIamgeUrl(e.target.value);
  };
  useEffect(() => {
    dispatch(detectActions.setImage(imageUrl));
    dispatch(detectActions.updateFaceLocation());
  }, [imageUrl]);

  //useEffect(() => console.log(imag), [imag]);

  const updateEntries = () => {
    fetch(`${api}image`, {
      method: "PUT",
      body: JSON.stringify({ id: profile.id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => dispatch(authActions.setProfile(data)));
  };

  const handleDetect = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ imgUrl: imageUrl }),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${api}detect`, requestOptions)
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
        <input
          type="text"
          id="imgUrl"
          onChange={onInputChange}
          value={imageUrl}
        />
        <button>detect</button>
      </form>
      {/* <p>{imag ? "true" : "false"}</p> */}
    </main>
  );
};

export default ImageLinkForm;
