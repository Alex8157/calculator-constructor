import { useSelector } from "react-redux";
import { Capacity } from "./UI/Capacity/Capacity";
import { EntryField } from "./UI/EntryField/EntryField";
import { NumericButton } from "./UI/NumericButton/NumericButton";
import style from "../styles/SideBar.module.css";

const OPERATORS = ["/", "x", "-", "+"];

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
            name="myBlock 1"
            inCanvas={false}
            content={
              <div className="myBlock 1">
                <EntryField name="myBlock 1" value="0"></EntryField>
              </div>
            }
          ></Capacity>
          <Capacity
            name="myBlock 2"
            inCanvas={false}
            content={
              <div style={{ display: "flex" }} className="myBlock 2">
                {makeButtons(OPERATORS, "smallWidth")}
              </div>
            }
          ></Capacity>
          <Capacity
            name="myBlock 3"
            inCanvas={false}
            content={
              <div className="myBlock 3">
                <div style={{ display: "flex" }} className="myBlock 3">
                  {makeButtons([1, 2, 3])}
                </div>
                <div style={{ display: "flex" }} className="myBlock 3">
                  {makeButtons([3, 5, 6])}
                </div>
                <div style={{ display: "flex" }} className="myBlock 3">
                  {makeButtons([7, 8, 9])}
                </div>
                <div style={{ display: "flex" }} className="myBlock 3">
                  <NumericButton value="0" width="bigWidth" />
                  <NumericButton value="," />
                </div>
              </div>
            }
          ></Capacity>
          <Capacity
            name="myBlock 4"
            inCanvas={false}
            content={
              <div style={{ display: "flex" }} className="myBlock 4">
                <NumericButton value="=" width="allWidth" color="blue" />
              </div>
            }
          ></Capacity>
        </>
      )}
    </div>
  );
}
