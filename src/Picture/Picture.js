import { useState, useEffect } from "react";

function Picture() {
  const [ url, setUrl ] = useState("");

  useEffect(() => {
    const displayPicture = async () => {
      const response = await fetch('https://picsum.photos/id/237/200/300');
      setUrl(url => response.url)
    }
    displayPicture();
  },[]);

  return (
    <>
      <h1>Picture</h1>
      <button>Display Image</button>
      <div>
        <img src={url}/>
      </div>
    </>
  );
}

export default Picture;
