import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatValue, formatDate } from "../Utils";

const ListOfItems = (props) => {
  return (
    <div className="Items">
      {props.arr.map((itm) => (
        <div
          className="Item"
          key={itm.id}
          id={itm.id}
          onClick={(e) => {
            if (e.target.getAttribute("fill")) {
              props.deleteItemFn(e.currentTarget);
              props.updateFilter();
            } else {
              props.setTrigger(true);
              props.editItemFn(e.currentTarget);
            }
          }}
        >
          <div>{formatDate(itm.date)}</div>
          <div>{formatValue(itm.value)}</div>
          <div className="longDesc">{itm.desc}</div>
          <FontAwesomeIcon icon={faTrash} title="Delete this item" />
        </div>
      ))}
    </div>
  );
};

export default ListOfItems;
