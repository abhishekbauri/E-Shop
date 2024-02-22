import "./Loader.css";

const Loader = ({ title = "Loading..." }) => {
  return (
    <div className="loading-spinner">
      <div className="loader"></div>
      <h3>{title}</h3>
    </div>
  );
};

export default Loader;
