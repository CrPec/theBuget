import ListOfItems from "./ListOfItems";

const Expenses = (props) => {
  return props.arrExpenses.length ? (
    <div className="Expenses">
      <div className="Title">
        <div>Expenses</div>
        <div>{props.formatValue(props.total(props.arrExpenses))}</div>
      </div>
      <div className="ItemsHeader">
        <div>Date</div>
        <div>Amount</div>
        <div>Description</div>
        <div></div>
      </div>
      <ListOfItems
        arr={props.arrExpenses}
        setTrigger={props.setTrigger}
        editItemFn={props.editItemFn}
        deleteItemFn={props.deleteItemFn}
      />
    </div>
  ) : (
    <div className="Expenses">You don't have any Expenses!!!</div>
  );
};

export default Expenses;
