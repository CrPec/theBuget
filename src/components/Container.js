import "../App.css";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import AddItem from "./AddItem";
import sampleData from "../Utils";
import { useState } from "react";

const Container = () => {
  const [addItem, setAddItem] = useState(false);
  const [items, setItems] = useState([]);

  const arr = (type) => {
    return items
      .filter((itm) => itm.type === type)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <div className="Container">
      <Incomes arrIncomes={arr("Incomes")} edit={setAddItem} />
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
      <Expenses arrExpenses={arr("Expenses")} />
      <button
        onClick={(e) => {
          e.currentTarget.style.display = "none";
          setItems(sampleData);
        }}
      >
        Load Sample
      </button>
    </div>
  );
};

export default Container;
