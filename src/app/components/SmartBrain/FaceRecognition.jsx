import { useSelector } from "react-redux";
import "./FaceRecognition.css";
import Image from "next/image";

const FaceRecognition = () => {
  const { imageUrl, faceLocation } = useSelector((state) => state.detect);

  return (
    <div className="recognize">
      <div className="posrel">
        {imageUrl.length > 0 && (
          <Image
            src={imageUrl}
            alt="imgee"
            width={0}
            height={0}
            id="imgee"
            sizes="100vw"
            style={{ width: "500px", height: "auto" }} // optional
          />
        )}

        {/* <img src={imageUrl} alt="imgee" width="400" height="auto" id="imgee" /> */}
        {faceLocation.map((box) => (
          <div className="bounding_box" style={box.box} key={box.id}></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
