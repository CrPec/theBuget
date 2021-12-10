import ListOfItems from "./ListOfItems";

const Incomes = (props) => {
  return props.arrIncomes.length ? (
    <div className="Incomes">
      <div className="Title">
        <div>{props.formatValue(props.total(props.arrIncomes))}</div>
        <div>Incomes</div>
      </div>
      <div className="ItemsHeader">
        <div>Date</div>
        <div>Amount</div>
        <div>Description</div>
        <div></div>
      </div>
      <ListOfItems
        arr={props.arrIncomes}
        setTrigger={props.setTrigger}
        editItemFn={props.editItemFn}
        deleteItemFn={props.deleteItemFn}
      />
    </div>
  ) : (
    <div className="Incomes">You don't have any Incomes!!!</div>
  );
};

export default Incomes;
