const Log = ({ value = "No data", replace = null, space = 2 }) => {
  const data = JSON.stringify(value, replace, space);
  return (
    <>
      <pre>
        <code>{data}</code>
      </pre>
    </>
  );
};

export default Log;
