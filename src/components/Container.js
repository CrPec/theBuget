import "../App.css";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import AddEditItem from "./AddEditItem";
import { sampleData } from "../Utils";
import { formatValue } from "../Utils";
import { useState, useEffect } from "react";

const Container = () => {
  const initialValueItems = () =>
    JSON.parse(localStorage.getItem("theBuget")) || [];

  const [items, setItems] = useState(initialValueItems());
  const [trigger, setTrigger] = useState(false);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    localStorage.setItem("theBuget", JSON.stringify(items));
  }, [items]);

  const itemsArr = (type) => {
    return type === "all"
      ? items
      : items
          .filter((itm) => itm.type === type)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const total = (arr) => {
    return arr
      .map((itm) => itm.value)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
  };

  const totalResult = (totalIncomes, totalExpenses) => {
    return totalIncomes - totalExpenses;
  };

  const editItemFn = (item) => {
    if (item.length === undefined) {
      try {
        const arrItem = itemsArr("all").filter(
          (itm) => itm.id === parseInt(item.getAttribute("id"))
        );
        if (arrItem[0] !== undefined) {
          setEditItem(arrItem[0]);
        } else {
          setEditItem({});
        }
      } catch {
        setEditItem({});
      }
    }
  };

  const deleteItemFn = (item) => {
    const newArr = itemsArr("all").filter(
      (itm) => itm.id !== parseInt(item.getAttribute("id"))
    );

    setItems(newArr);
  };

  return (
    <div>
      <div className="Total">
        <span
          className={
            totalResult(
              total(itemsArr("Incomes")),
              total(itemsArr("Expenses"))
            ) >= 0
              ? "TotalPozitive"
              : "TotalNegative"
          }
        >
          {formatValue(
            totalResult(total(itemsArr("Incomes")), total(itemsArr("Expenses")))
          )}
        </span>
        {items.length === 0 && (
          <button
            onClick={(e) => {
              e.currentTarget.style.display = "none";
              setItems(sampleData);
            }}
          >
            Load Sample
          </button>
        )}
      </div>
      <div className="Container">
        <Incomes
          formatValue={formatValue}
          total={total}
          arrIncomes={itemsArr("Incomes")}
          setTrigger={setTrigger}
          editItemFn={editItemFn}
          deleteItemFn={deleteItemFn}
        />
        <div
          className="AddNewItem"
          title="Add new item"
          onClick={() => {
            setTrigger(true);
            editItemFn({});
          }}
        ></div>
        <AddEditItem
          trigger={trigger}
          setTrigger={setTrigger}
          items={items}
          setItems={setItems}
          editItem={editItem}
          editItemFn={editItemFn}
          id={trigger ? Date.now() : 0}
        />
        <Expenses
          formatValue={formatValue}
          total={total}
          arrExpenses={itemsArr("Expenses")}
          setTrigger={setTrigger}
          editItemFn={editItemFn}
          deleteItemFn={deleteItemFn}
        />
      </div>
    </div>
  );
};

export default Container;
