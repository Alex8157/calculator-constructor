import { useDispatch, useSelector } from "react-redux";
import style from "./Selector.module.css";

export function Selector(props) {
  const activeBlock = useSelector((state) => state.option.option);

  const dispatch = useDispatch();

  const setActive = (name) => {
    dispatch({ type: "CHANGE_OPTION", payload: name });
    if (name === "Constructor") {
      dispatch({ type: "CLEAN_CANVAS" });
      dispatch({ type: "CLEAN_ALL", payload: "*" });
    }
  };

  const getCurrentImg = (name) => {
    if (activeBlock === "Runtime") {
      return name === "Eye" ? "blueEye.png" : "greySelector.png";
    } else {
      return name === "Eye" ? "greyEye.png" : "blueSelector.png";
    }
  };

  const checkActive = (name) => {
    return name === activeBlock ? style.active : "";
  };

  return (
    <div className={style.selector}>
      <div
        className={`${style.selectorBlock} ${checkActive("Runtime")}`}
        onClick={() => setActive("Runtime")}
      >
        <img
          className={style.selectorImage}
          src={process.env.PUBLIC_URL + getCurrentImg("Eye")}
          alt="eye"
        />
        <button className={`${style.selectorButton} fontInter`}>Runtime</button>
      </div>
      <div
        className={`${style.selectorBlock} ${checkActive("Constructor")}`}
        onClick={() => setActive("Constructor")}
      >
        <img
          className={style.selectorImage}
          src={process.env.PUBLIC_URL + getCurrentImg("Selector")}
          alt="selector"
        />
        <button className={`${style.selectorButton} fontInter`}>
          Constructor
        </button>
      </div>
    </div>
  );
}
