import ListOfItems from "./ListOfItems";

const Expenses = (props) => {
  return props.arrExpenses.length ? (
    <div className="Expenses">
      <div className="title">Expenses</div>
      <ListOfItems
        arr={props.arrExpenses}
        edit={props.edit}
        editItemFn={props.editItemFn}
      />
    </div>
  ) : (
    <div className="Expenses">You don't have Expenses!!!</div>
  );
};

export default Expenses;
