import { useDispatch, useSelector } from "react-redux";
import style from "./NumericButton.module.css";

export function NumericButton(props) {
  const activeBlock = useSelector((state) => state.option.option);

  const dispatch = useDispatch();

  const add = () => {
    if (activeBlock === "Runtime") {
      if (props.value === "=") {
        dispatch({ type: "CLEAN_STRING" });
      } else {
        props.value === "x"
          ? dispatch({ type: "ADD_IN_STRING", payload: "*" })
          : dispatch({ type: "ADD_IN_STRING", payload: props.value });
      }
    }
  };

  const calculateWidth = () => {
    return props.width ? style[props.width] : style.standartWidth;
  };
  const calculateColor = () => {
    return props.color ? style[props.color] : style.white;
  };
  return (
    <button
      onClick={add}
      className={`${
        style.button
      } ${calculateWidth()} ${calculateColor()} fontInter`}
    >
      {props.value}
    </button>
  );
}
