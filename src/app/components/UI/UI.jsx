import cls from "./UI.module.css";

const Ui = () => {
  return <div>Ui</div>;
};

export default Ui;

export const Input = ({ type, value, setChange, label }) => {
  return (
    <div className={cls.control}>
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        id={type}
        required
        value={value}
        onChange={(e) => setChange(e.target.value)}
        autoComplete="on"
      />
    </div>
  );
};

export const Button = ({ label }) => {
  return <button>{label}</button>;
};
