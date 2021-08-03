import "../App.css";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import AddItem from "./AddItem";
import sampleData from "../Utils";
import { formatValue } from "../Utils";
import { useState } from "react";

const Container = () => {
  const [addItem, setAddItem] = useState(false);
  const [items, setItems] = useState([]);

  const arr = (type) => {
    return items
      .filter((itm) => itm.type === type)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const total = (arrIncomes, arrExpenses) => {
    const inc = arrIncomes
      .map((itm) => itm.value)
      .reduce((accumulator, currentValue) => {
        console.log(currentValue);
        return accumulator + currentValue;
      }, 0);
    const exp = arrExpenses
      .map((itm) => itm.value)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

    return inc - exp;
  };

  return (
    <div>
      <div className="Total">
        Total
        <span
          className={
            total(arr("Incomes"), arr("Expenses")) >= 0
              ? "TotalPozitive"
              : "TotalNegative"
          }
        >
          {formatValue(total(arr("Incomes"), arr("Expenses")))}
        </span>
        <button
          onClick={(e) => {
            e.currentTarget.style.display = "none";
            setItems(sampleData);
          }}
        >
          Load Sample
        </button>
      </div>
      <div className="Container">
        <Incomes arrIncomes={arr("Incomes")} edit={setAddItem} />
        <div
          className="AddNewItem"
          title="Add new item"
          onClick={() => {
            setAddItem(true);
          }}
        ></div>
        <AddItem
          trigger={addItem}
          setTrigger={setAddItem}
          items={items}
          setItems={setItems}
          id={addItem ? Date.now() : 0}
        />
        <Expenses arrExpenses={arr("Expenses")} edit={setAddItem} />
      </div>
    </div>
  );
};

export default Container;
