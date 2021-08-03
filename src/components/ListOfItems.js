import { formatValue } from "../Utils";

const ListOfItems = (props) => {
  return (
    <div className="Items">
      <div className="ItemHeader">
        <div>Date</div>
        <div>Amount</div>
        <div>Description</div>
      </div>
      {props.arr.map((itm, i) => (
        <div
          className="Item"
          key={itm.id}
          id={itm.id}
          onClick={(e) => {
            props.edit(true);
            props.editItemFn(e.currentTarget);
          }}
        >
          <div>{itm.date}</div>
          <div>{formatValue(itm.value)}</div>
          <div>{itm.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default ListOfItems;
