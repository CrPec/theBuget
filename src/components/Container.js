import "../App.css";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import AddItem from "./AddItem";
import sampleData from "../Utils";
import { formatValue } from "../Utils";
import { useState, useEffect } from "react";

const Container = () => {
  const initialValue = () => JSON.parse(localStorage.getItem("theBuget")) || [];
  const [addItem, setAddItem] = useState(false);
  const [items, setItems] = useState(initialValue());
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    localStorage.setItem("theBuget", JSON.stringify(items));
  }, [items]);

  const arr = (type) => {
    return type === "all"
      ? items
      : items
          .filter((itm) => itm.type === type)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const total = (arrIncomes, arrExpenses) => {
    const inc = arrIncomes
      .map((itm) => itm.value)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    const exp = arrExpenses
      .map((itm) => itm.value)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

    return inc - exp;
  };

  const editItemFn = (item) => {
    if (item.length === undefined) {
      try {
        const arrItem = arr("all").filter(
          (itm) => itm.id === parseInt(item.getAttribute("id"))
        );
        setEditItem(arrItem[0]);
      } catch {
        setEditItem({});
      }
    }
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
        {items.length === 0 ? (
          <button
            onClick={(e) => {
              e.currentTarget.style.display = "none";
              setItems(sampleData);
            }}
          >
            Load Sample
          </button>
        ) : null}
      </div>
      <div className="Container">
        <Incomes
          arrIncomes={arr("Incomes")}
          edit={setAddItem}
          editItemFn={editItemFn}
        />
        <div
          className="AddNewItem"
          title="Add new item"
          onClick={() => {
            setAddItem(true);
            editItemFn({});
          }}
        ></div>
        <AddItem
          trigger={addItem}
          setTrigger={setAddItem}
          items={items}
          setItems={setItems}
          editItem={editItem}
          editItemFn={editItemFn}
          id={addItem ? Date.now() : 0}
        />
        <Expenses
          arrExpenses={arr("Expenses")}
          edit={setAddItem}
          editItemFn={editItemFn}
        />
      </div>
    </div>
  );
};

export default Container;
