import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Capacity } from "./UI/Capacity/Capacity";
import style from "../styles/Canvas.module.css";

export function Canvas() {
  const [background, changeBackground] = useState("white");
  const [visibleBorder, changeVisibleBorder] = useState(false);
  const buffer = useSelector((state) => state.buffer.buffer);
  const canvas = useSelector((state) => state.canvas.canvas);

  let name = "";

  const dispatch = useDispatch();

  const dragOverHandler = (e) => {
    e.preventDefault();
    !canvas.length && changeBackground("#F0F9FF");
    if (e.target.className.includes("myCanvas") && canvas.length)
      changeVisibleBorder(true);
  };
  const dragEndHandler = (e) => {
    changeBackground("white");
    changeVisibleBorder(false);
  };
  const dragLeaveHandler = (e) => {
    if (e.target.className.includes("myBlock")) name = e.target.className;
    changeBackground("white");
    changeVisibleBorder(false);
  };
  const dropHandler = (e) => {
    e.preventDefault();
    changeBackground("white");
    changeVisibleBorder(false);
    if (!e.target.className.includes("myCanvas")) {
      dispatch({
        type: "CHANGE_POSITION_IN_CANVAS",
        payload: { buffer, className: name },
      });
    } else {
      dispatch({ type: "ADD_IN_CANVAS", payload: buffer });
    }
  };
  const dragOverCapacityHandler = (e) => {};

  return (
    <div
      className={`${style.canvas} myCanvas`}
      style={{
        background,
        justifyContent: canvas.length ? "flex-start" : "center",
        border: canvas.length ? "none" : "2px dashed #c4c4c4",
      }}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDrop={(e) => dropHandler(e)}
    >
      {canvas.length ? (
        canvas.map((unit) => {
          return (
            <Capacity
              onDragOver={(e) => dragOverCapacityHandler(e)}
              inCanvas={true}
              key={unit.props.className}
              content={unit}
              name={unit.props.className}
              //thisInput={unit.props.className === "myBlock 1" ? true : false}
            />
          );
        })
      ) : (
        <>
          <img
            className={style.canvasPicture}
            src="https://cdn-icons-png.flaticon.com/512/7010/7010066.png"
            alt="addPicture"
          />
          <span className={`${style.blueText} fontInter`}>Перетащите сюда</span>
          <span className={`${style.greyText}`}>
            любой элемент из левой панели
          </span>
        </>
      )}
      {visibleBorder && <div className={style.visibleBorder}></div>}
    </div>
  );
}
