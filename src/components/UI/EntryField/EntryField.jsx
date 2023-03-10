import { useSelector } from "react-redux";
import style from "./EntryField.module.css";

export function EntryField(props) {
  const input = useSelector((state) => state.countingState.input);
  return (
    <input
      value={input ? input : props.value}
      readOnly
      className={`${style.input} ${props.name}`}
    />
  );
}
