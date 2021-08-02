const ListOfItems = (props) => {
  return (
    <div className="Items">
      {props.arr.map((itm, i) => (
        <div className="Item" key={itm.id} onClick={() => props.edit(true)}>
          <div>{itm.date}</div>
          <div>{itm.value}</div>
          <div>{itm.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default ListOfItems;
