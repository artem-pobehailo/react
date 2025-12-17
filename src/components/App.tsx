import { useState } from "react";

import "./App.css";
import Product from "./Product";

function App() {
  const [count, setCount] = useState(0);

  const techName = "React";
  const imgUrl =
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=640";

  return (
    <>
      {techName}
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>

      <img src={imgUrl} alt="Man, field and a mountain" width="640" />
      <div>
        <h1>Products</h1>
        <Product
          name="dfsfsddf"
          imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
          price={10.99}
        />
        <Product
          name="fadfgsdgsd"
          imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
          price={14.29}
        />
      </div>
    </>
  );
}

export default App;
