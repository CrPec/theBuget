import React, { useState } from "react";

const AddItem = (props) => {
  const [item, setItem] = useState({});

  return props.trigger ? (
    <div className="AddItem">
      <div className="AddItemContainer">
        <div className="Error">Please add something in each field!</div>
        <select
          onChange={(e) =>
            setItem({ ...item, type: e.target.value, id: props.id })
          }
        >
          <option value="">Please select type</option>
          <option value="Incomes">Incomes</option>
          <option value="Expenses">Expenses</option>
        </select>
        <input
          type="number"
          placeholder="Value"
          onChange={(e) =>
            setItem({ ...item, value: parseInt(e.target.value) })
          }
        />
        <input
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
          onChange={(e) => setItem({ ...item, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setItem({ ...item, desc: e.target.value })}
        />
        <div className="AddItemButtons">
          <button
            className="buttons save"
            onClick={() => {
              if (Object.keys(item).length === 5) {
                let allItems = [...props.items, item];
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
            className="buttons cancel"
            onClick={() => {
              setItem({});
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

export default AddItem;
