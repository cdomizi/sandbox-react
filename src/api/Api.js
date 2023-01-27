import { useState, useEffect } from "react";

function Api() {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await fetch('https://api.npoint.io/497358e0bb943bdbb3dc');
        const json = await res.json();
  
        !ignore && setData(json);
        return ignore = true;
      } catch(e) {
        !ignore && setData(false)
        return ignore = true;
      }
    };

    setTimeout(() => {
      fetchData()
    }, 2000);
    
    return () => ignore = true;
  }, [data]);

  const log = (arg) => {
    return (
      <>
        <pre>
          <code>
            {JSON.stringify(arg, null, 2)}
          </code>
        </pre>
      </>
    );
  };

  return (
    <>
      { data === null ?
        'Sto caricando....' :
        !data ?
          'Errore: impossibile caricare i dati' :
          !data.compensi.length ?
            'Nessun risultato trovato' :
            log(data.compensi)
      }
    </>
  );
}

export default Api;
