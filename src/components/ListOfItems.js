import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatValue } from "../Utils";

const ListOfItems = (props) => {
  return (
    <div className="Items">
      <div className="ItemHeader">
        <div>Date</div>
        <div>Amount</div>
        <div>Description</div>
        <div></div>
      </div>
      {props.arr.map((itm) => (
        <div
          className="Item"
          key={itm.id}
          id={itm.id}
          onClick={(e) => {
            if (e.target.getAttribute("fill")) {
              props.deleteItemFn(e.currentTarget);
            } else {
              props.setTrigger(true);
              props.editItemFn(e.currentTarget);
            }
          }}
        >
          <div>{itm.date}</div>
          <div>{formatValue(itm.value)}</div>
          <div>{itm.desc}</div>
          <FontAwesomeIcon icon={faTrash} title="Delete this item" />
        </div>
      ))}
    </div>
  );
};

export default ListOfItems;
