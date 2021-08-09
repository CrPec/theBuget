import "../App.css";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import AddEditItem from "./AddEditItem";
import FilterOptions from "./FilterOptions";
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
        const arrItem = itemsArr("all").filter(
          (itm) => itm.id === parseInt(item.getAttribute("id"))
        );
        setEditItem(arrItem[0]);
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

  const filterItemsFn = (year) => {
    if (year === "") {
      setItems(JSON.parse(localStorage.getItem("filter")));
      localStorage.setItem("filter", JSON.stringify([]));
    } else {
      localStorage.setItem("filter", JSON.stringify(items));
      setItems(items.filter((itm) => itm.date.split("-")[0] === year));
    }
  };

  return (
    <div>
      <div className="Total">
        Total
        <span
          className={
            total(itemsArr("Incomes"), itemsArr("Expenses")) >= 0
              ? "TotalPozitive"
              : "TotalNegative"
          }
        >
          {formatValue(total(itemsArr("Incomes"), itemsArr("Expenses")))}
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
        ) : (
          <FilterOptions itemsArr={itemsArr} filterItemsFn={filterItemsFn} />
        )}
      </div>
      <div className="Container">
        <Incomes
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
