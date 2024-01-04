import { useSelector } from "react-redux";
import "./FaceRecognition.css";

const FaceRecognition = () => {
  const { imageUrl, faceLocation } = useSelector((state) => state.detect);

  return (
    <div className="recognize">
      <div className="posrel">
        <img src={imageUrl} alt="imgee" width="400" height="auto" id="imgee" />
        {faceLocation.map((box) => (
          <div className="bounding_box" style={box.box} key={box.id}></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
