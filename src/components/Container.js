import "../App.css";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import Popup from "./Popup";
import { useState } from "react";

const Container = () => {
  const [btnPopup, setBtnPopup] = useState(false);

  return (
    <div className="Container">
      <Incomes />
      <div
        className="circle"
        title="Add new item"
        onClick={() => setBtnPopup(true)}
      ></div>
      <Popup trigger={btnPopup} setTrigger={setBtnPopup} />
      <Expenses />
    </div>
  );
};

export default Container;
