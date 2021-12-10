function extractYear(arr) {
  let s = new Set();
  arr.forEach((itm) => {
    const date = new Date(itm.date);
    s.add(date.getFullYear());
  });

  return ["All", ...s];
}
const Filter = (props) => {
  return (
    <div className="Filter" onClick={() => extractYear(props.arr)}>
      <select
        id="dropDown"
        onChange={(e) => {
          props.fiterfn(e.target.value);
        }}
      >
        {extractYear(props.arr).map((itm) => (
          <option key={itm} value={itm}>
            {itm}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
