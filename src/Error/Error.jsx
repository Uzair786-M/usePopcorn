const Error = ({ isError }) => {
  return (
    <div className="error">
      <span>⛔</span>
      {isError}
    </div>
  );
};

export default Error;
