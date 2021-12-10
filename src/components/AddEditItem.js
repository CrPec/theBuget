import React, { useState, useEffect } from "react";

const AddEditItem = (props) => {
  const [item, setItem] = useState({});

  useEffect(() => {
    if (props.trigger) {
      setItem(props.editItem);
    }
  }, [props.trigger, props.editItem]);

  const deleteKey = (obj, arrKey) => {
    for (const property in obj) {
      if (arrKey.includes(property)) {
        delete obj[property];
      }
    }
    setItem({ ...obj });
  };

  return props.trigger ? (
    <div className="AddEditItem">
      <div className="AddEditItemContainer">
        <div className="Error">Please add something in each field!</div>
        <select
          value={item.type || ""}
          onChange={(e) => {
            setItem({
              ...item,
              type: e.target.value,
              id: item.id ? item.id : props.id,
            });
            if (e.target.value === "") {
              deleteKey(item, ["type"]);
            }
          }}
        >
          <option value="">Please select type</option>
          <option value="Incomes">Incomes</option>
          <option value="Expenses">Expenses</option>
        </select>
        <input
          value={item.value || ""}
          type="number"
          placeholder="Value in cents"
          onChange={(e) => {
            setItem({ ...item, value: parseInt(e.target.value) });
            if (isNaN(e.target.value)) {
              deleteKey(item, ["value"]);
            }
          }}
        />
        <input
          value={item.date || ""}
          type="date"
          max={`${new Date().getFullYear()}-${
            new Date().getMonth() + 1 < 10
              ? "0" + (new Date().getMonth() + 1)
              : new Date().getMonth() + 1
          }-${
            new Date().getDate() < 10
              ? "0" + new Date().getDate()
              : new Date().getDate()
          }`}
          onChange={(e) => {
            setItem({ ...item, date: e.target.value });
            if (e.target.value === "") {
              deleteKey(item, ["date"]);
            }
          }}
        />
        <input
          value={item.desc || ""}
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setItem({ ...item, desc: e.target.value });
            if (e.target.value === "") {
              deleteKey(item, ["desc"]);
            }
          }}
        />
        <div className="AddEditItemButtons">
          <button
            className="Buttons Save"
            onClick={() => {
              let allItems = [];
              if (Object.keys(item).length === 5) {
                allItems = [...props.items].filter((itm) => itm.id !== item.id);
                allItems.push(item);
                props.setItems(allItems);
                props.setTrigger(false);
                setItem({});
                document.querySelector(".Error").style.display = "none";
              } else {
                document.querySelector(".Error").style.display = "block";
              }
            }}
          >
            Save
          </button>
          <button
            className="Buttons Cancel"
            onClick={() => {
              setItem({});
              props.editItemFn({});
              props.setTrigger(false);
              document.querySelector(".Error").style.display = "none";
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AddEditItem;
