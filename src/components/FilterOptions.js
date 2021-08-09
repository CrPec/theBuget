const values = (arr) => {
  let s = new Set();
  arr.forEach((itm) => s.add(itm.date.split("-")[0]));
  return [...s];
};

const FilterOptions = (props) => {
  return (
    <select
      onChange={(e) => {
        console.log(e.target.value);
        props.filterItemsFn(e.target.value);
      }}
    >
      <option value="">Filter by year</option>
      {values(props.arr("all")).map((itm) => (
        <option key={itm} value={itm}>
          {itm}
        </option>
      ))}
    </select>
  );
};

export default FilterOptions;
