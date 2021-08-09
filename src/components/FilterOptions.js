const values = (arr) => {
  let s = new Set();
  arr.forEach((itm) => s.add(itm.date.split("-")[0]));
  return [...s].sort((a, b) => a - b);
};

const FilterOptions = (props) => {
  return (
    <select
      onChange={(e) => {
        props.filterItemsFn(e.target.value);
      }}
    >
      <option value="">Filter by year</option>
      {values(props.itemsArr("all")).map((itm) => (
        <option key={itm} value={itm}>
          {itm}
        </option>
      ))}
    </select>
  );
};

export default FilterOptions;
