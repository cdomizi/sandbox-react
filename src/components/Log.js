const Log = ({ value = "No data", replace = null, space = 2 }) => {
  const data = JSON.stringify(value, replace, space);
  return (
    <>
      <pre>
        <code style={{ whiteSpace: "pre-wrap" }}>{data}</code>
      </pre>
    </>
  );
};

export default Log;
