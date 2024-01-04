import { useSelector } from "react-redux";

const User = () => {
  const { profile } = useSelector((state) => state.auth);
  return (
    <div className="user">
      <h4>{`Hello ${profile.name}, You have uploaded ${profile.entries} photos for detection`}</h4>
    </div>
  );
};

export default User;
