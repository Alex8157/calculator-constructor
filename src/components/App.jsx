import { SideBar } from "./SideBar";
import { Selector } from "./UI/Selector/Selector";
import { Canvas } from "./Canvas";
import style from "../styles/App.module.css";

export function App() {
  return (
    <div className={style.App}>
      <SideBar />
      <div className={style.rightPart}>
        <Selector />
        <Canvas />
      </div>
    </div>
  );
}
