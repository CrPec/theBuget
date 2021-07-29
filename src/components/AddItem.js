import React, { useState } from "react";

const AddItem = (props) => {
  const [item, setItem] = useState({});

  return props.trigger ? (
    <div className="AddItem">
      <div className="AddItemContainer">
        <select onChange={(e) => setItem({ ...item, type: e.target.value })}>
          <option value="">Please select type</option>
          <option value="Incomes">Incomes</option>
          <option value="Expenses">Expenses</option>
        </select>
        <input
          type="number"
          placeholder="Value"
          onChange={(e) => setItem({ ...item, value: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date"
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
              setItem({ ...item, id: Date.now() });
              let allItems = [...props.items];
              allItems.push(item);
              props.setItems(allItems);
              props.setTrigger(false);
            }}
          >
            Save
          </button>
          <button
            className="buttons cancel"
            onClick={() => {
              setItem({});
              props.setTrigger(false);
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
