import "../App.css";

const Container = () => {
  const handleClick = () => {
    alert("click");
  };
  return (
    <div className="Container">
      <div className="circle" title="Add new item" onClick={handleClick}></div>
    </div>
  );
};

export default Container;
