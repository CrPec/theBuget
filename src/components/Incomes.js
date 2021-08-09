import ListOfItems from "./ListOfItems";

const Incomes = (props) => {
  return props.arrIncomes.length ? (
    <div className="Incomes">
      <div className="title">Incomes</div>
      <ListOfItems
        arr={props.arrIncomes}
        setTrigger={props.setTrigger}
        editItemFn={props.editItemFn}
        deleteItemFn={props.deleteItemFn}
      />
    </div>
  ) : (
    <div className="Incomes">You don't have Incomes!!!</div>
  );
};

export default Incomes;
