import React, { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import ProductModal from './ProductModal';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data.products);
    }

    fetchProductData();
  }, []);

  const handleAddProduct = (product) => {
    setShowModal(true);
};

const handleDeleteProduct = (product) => {
  const updatedProducts = products.filter((existingProduct) =>
      existingProduct.productId !== product.productId
  );
  setProducts(updatedProducts);
};

const handleCreateProduct = async (product) => {
    try {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
    
        if (!response.ok) {
            // If the response status is not in the range 200-299, consider it an error
            const errorMessage = `Failed to add the product: ${response.statusText}`;
            throw new Error(errorMessage);
        }
    
        const newProduct = await response.json();
        setProducts((products) => [...products, newProduct]);
        setShowModal(false);
    } catch (error) {
        // Handle and log the error
        console.error(error);
        throw error; // Re-throw the error for further handling or display
    }
}

const handleUpdateProduct = async (product) => {
    // Perform the edit operation and update the products state
    const updatedProducts = products.map((existingProduct) =>
        existingProduct.productId === product.productId ? product : existingProduct
    );
    setProducts(updatedProducts);
    // call handleModalClose if no error
    handleModalClose();
};

  const handleSaveProduct = async (product) => {
    // const existingProductIds = products.map(existingProduct => existingProduct.productId)
    // if (existingProductIds.includes(product.productId)) {
    if ("productId" in product) {
        await handleUpdateProduct(product);
    } else {
        await handleCreateProduct(product);
    }
}

const handleEditProduct = (product) => {
  setSelectedProduct(product);
  setShowModal(true);
};

const handleModalClose = () => {
  setSelectedProduct(undefined);
  setShowModal(false);
}

  return <div className="container">
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Product Table</h1>
        <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Add New Product</button>
    </div>
    <ProductTable
      products={products}
      handleDeleteProduct={handleDeleteProduct}
      // setSelectedProduct={setSelectedProduct}
      handleEditProduct={handleEditProduct}
    />,
    {showModal && <ProductModal
      showModal={showModal}
      product={selectedProduct}
      onSave={handleSaveProduct}
      onClose={handleModalClose}
  />}
  </div>
}

export default App;