const Popup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <select>
          <option value="">Please select something</option>
          <option value="Incomes">Incomes</option>
          <option value="Expenses">Expenses</option>
        </select>
        <input type="text" placeholder="Value" />
        <div
          className="close-btn"
          onClick={() => props.setTrigger(false)}
        ></div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
