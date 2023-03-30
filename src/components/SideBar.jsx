import { useSelector } from "react-redux";
import { Capacity } from "./UI/Capacity/Capacity";
import { EntryField } from "./UI/EntryField/EntryField";
import { NumericButton } from "./UI/NumericButton/NumericButton";
import style from "../styles/SideBar.module.css";

const OPERATORS = ["/", "x", "-", "+"];
const myBlock1 = "myBlock 1";
const myBlock2 = "myBlock 2";
const myBlock3 = "myBlock 3";
const myBlock4 = "myBlock 4";

export function SideBar() {
  const activeBlock = useSelector((state) => state.option.option);

  const makeButtons = (array, width) => {
    return array.map((unit) => {
      return <NumericButton key={unit} value={unit} width={width} />;
    });
  };

  return (
    <div className={style.sideBar}>
      {activeBlock === "Constructor" && (
        <>
          <Capacity
            name={myBlock1}
            inCanvas={false}
            content={
              <div className={myBlock1}>
                <EntryField name={myBlock1} value="0"></EntryField>
              </div>
            }
          ></Capacity>
          <Capacity
            name={myBlock2}
            inCanvas={false}
            content={
              <div style={{ display: "flex" }} className={myBlock2}>
                {makeButtons(OPERATORS, "smallWidth")}
              </div>
            }
          ></Capacity>
          <Capacity
            name={myBlock3}
            inCanvas={false}
            content={
              <div className={myBlock3}>
                <div style={{ display: "flex" }} className={myBlock3}>
                  {makeButtons([1, 2, 3])}
                </div>
                <div style={{ display: "flex" }} className={myBlock3}>
                  {makeButtons([3, 5, 6])}
                </div>
                <div style={{ display: "flex" }} className={myBlock3}>
                  {makeButtons([7, 8, 9])}
                </div>
                <div style={{ display: "flex" }} className={myBlock3}>
                  <NumericButton value="0" width="bigWidth" />
                  <NumericButton value="," />
                </div>
              </div>
            }
          ></Capacity>
          <Capacity
            name={myBlock4}
            inCanvas={false}
            content={
              <div style={{ display: "flex" }} className={myBlock4}>
                <NumericButton value="=" width="allWidth" color="blue" />
              </div>
            }
          ></Capacity>
        </>
      )}
    </div>
  );
}
