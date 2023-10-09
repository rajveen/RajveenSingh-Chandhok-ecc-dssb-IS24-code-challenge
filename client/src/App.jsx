import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/health-check")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));

    fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setProducts(data.products);
        });
  }, []);

  return (
    <div className="app">
      <h1>{message}</h1>
      <div>{JSON.stringify(products)}</div>
    </div>
  );
}

export default App;