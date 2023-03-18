import "../App.css";
import Incomes from "./Incomes";
import Expenses from "./Expenses";
import AddEditItem from "./AddEditItem";
import Filter from "./Filter";
import { sampleData } from "../Utils";
import { formatValue } from "../Utils";
import { useState, useEffect } from "react";

const Container = () => {
  const initialValueItems = () =>
    JSON.parse(localStorage.getItem("theBuget")) || [];

  const [items, setItems] = useState(initialValueItems());
  const [trigger, setTrigger] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [filter, setFilter] = useState([]);
  const [boolVar, setBoolVar] = useState(false);

  useEffect(() => {
    localStorage.setItem("theBuget", JSON.stringify(items));
    localStorage.setItem("theBuget-Filter", JSON.stringify(filter));
  }, [items, filter, boolVar]);

  const itemsArr = (type) => {
    return type === "all"
      ? items
      : items
          .filter((itm) => itm.type === type)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const total = (arr) => {
    return arr
      .map((itm) => {
        return itm.value;
      })
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

  const filterfn = (txt) => {
    if (txt === "All") {
      setBoolVar(false);
      setFilter([]);
    } else {
      setBoolVar(true);
      setFilter(
        items.filter((itm) => {
          const date = new Date(itm.date);
          return date.getFullYear() === parseInt(txt);
        })
      );
    }
  };

  const filterArr = (type) => {
    return filter
      .filter((itm) => itm.type === type)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const updateFilter = () => {
    const filter = document.querySelector("#dropDown");
    const originalValue = filter.value;
    if (originalValue !== "All") {
      filter.value = "All";
      filter.dispatchEvent(new Event("change", { bubbles: true }));
      setTimeout(() => {
        if ([...filter.options].map((ev) => ev.label).includes(originalValue)) {
          filter.value = originalValue;
          filter.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, 0);
    }
  };

  return (
    <div>
      <div className="Total">
        <span
          className={
            totalResult(
              total(boolVar ? filterArr("Incomes") : itemsArr("Incomes")),
              total(boolVar ? filterArr("Expenses") : itemsArr("Expenses"))
            ) >= 0
              ? "TotalPozitive"
              : "TotalNegative"
          }
        >
          {formatValue(
            totalResult(
              total(boolVar ? filterArr("Incomes") : itemsArr("Incomes")),
              total(boolVar ? filterArr("Expenses") : itemsArr("Expenses"))
            )
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
      <Filter arr={items} fiterfn={filterfn} />
      <div className="Container">
        <Incomes
          formatValue={formatValue}
          total={total}
          arrIncomes={boolVar ? filterArr("Incomes") : itemsArr("Incomes")}
          setTrigger={setTrigger}
          editItemFn={editItemFn}
          deleteItemFn={deleteItemFn}
          updateFilter={updateFilter}
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
          updateFilter={updateFilter}
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
          arrExpenses={boolVar ? filterArr("Expenses") : itemsArr("Expenses")}
          setTrigger={setTrigger}
          editItemFn={editItemFn}
          deleteItemFn={deleteItemFn}
          updateFilter={updateFilter}
        />
      </div>
    </div>
  );
};

export default Container;
