import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Capacity.module.css";

export function Capacity(props) {
  const activeBlock = useSelector((state) => state.option.option);
  const canvas = useSelector((state) => state.canvas.canvas);
  const positions = useSelector((state) => state.canvas.positions);
  const [banAdding, setBanAdding] = useState(false);
  const [guidance, setGuidance] = useState(false);

  const inCanvas = props.inCanvas;
  //const thisInput = props.thisInput;

  let count = 0;
  let timer;

  const checkDraggable = () => {
    //if (thisInput) return false;
    if (inCanvas && activeBlock === "Constructor") {
      return true;
    } else if (activeBlock === "Constructor" && !banAdding) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!inCanvas && !positions.includes(props.name.slice(-1))) {
      setGuidance(false);
      setBanAdding(false);
    }
  }, [canvas]);

  const dispatch = useDispatch();

  const dragOverHandler = (e) => {
    inCanvas && setGuidance(true);
    e.preventDefault();
  };
  const dragStartHandler = (e) => {
    count = canvas.length;
    dispatch({ type: "CHANGE_BUFFER", payload: props.content });
  };
  const dragLeaveHandler = (e) => {
    setGuidance(false);
  };
  const dragEndHandler = (e) => {
    dispatch({ type: "CHANGE_BUFFER", payload: "" });
    if (count !== canvas.length && !inCanvas) setBanAdding(true);
    setGuidance(false);
  };
  const dropHandler = (e) => {
    setGuidance(false);
    e.preventDefault();
  };

  return (
    <>
      <div
        onDoubleClick={(e) => {
          clearTimeout(timer);
          if (inCanvas && activeBlock === "Constructor")
            dispatch({
              type: "DELETE_BLOCK",
              payload: e.currentTarget.className,
            });
        }}
        draggable={checkDraggable()}
        style={{
          cursor: checkDraggable() ? "grab" : "default",
          opacity: !banAdding ? "100%" : "50%",
          marginBottom: guidance ? "11px" : "12px",
        }}
        onDragOver={(e) => dragOverHandler(e)}
        onDragStart={(e) => dragStartHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDrop={(e) => dropHandler(e)}
        className={`${style.capacity} ${props.name}`}
      >
        {props.content}
      </div>
      {guidance && <div className={style.guidance}></div>}
    </>
  );
}
