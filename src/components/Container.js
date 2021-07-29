import "../App.css";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import AddItem from "./AddItem";
import { useState } from "react";

const Container = () => {
  const [addItem, setAddItem] = useState(false);
  const [items, setItems] = useState([]);

  return (
    <div className="Container">
      <Incomes />
      <div
        className="circle"
        title="Add new item"
        onClick={() => setAddItem(true)}
      ></div>
      <AddItem
        trigger={addItem}
        setTrigger={setAddItem}
        items={items}
        setItems={setItems}
      />
      <Expenses />
    </div>
  );
};

export default Container;
