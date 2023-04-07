const Log = ({ value = "No data", rep = null, space = 2 }) => {
  const data = JSON.stringify(value, rep, space);
  return (
    <>
      <pre>
        <code>{data}</code>
      </pre>
    </>
  );
};

export default Log;
