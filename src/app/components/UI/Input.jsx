import cls from "./Input.module.css";

const Input = ({ type, value, setChange, label }) => {
  return (
    <div className={cls.control}>
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        id={type}
        required
        value={value}
        onChange={(e) => setChange(e.target.value)}
        autocomplete="on"
      />
    </div>
  );
};

export default Input;
