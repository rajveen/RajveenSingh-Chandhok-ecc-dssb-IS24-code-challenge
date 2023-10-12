import React, { useState, useEffect } from "react";
import ProductTable from "./product/ProductTable";
import ProductModal from './product/ProductModal';
import HealthCheck from "./health/HealthCheck";
import SearchBar from "./SearchBar";
import _ from "lodash";
import "./app.css";

function App() {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();
    const [showModal, setShowModal] = useState(false);
    const [scrumMasterSearchTerm, setScrumMasterSearchTerm] = useState("");
    const [developerSearchTerm, setDeveloperSearchTerm] = useState("");

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await fetch("http://localhost:3000/api/products");
            const data = await response.json();
            setAllProducts(_.cloneDeep(data.products));
            setProducts(_.cloneDeep(data.products));
        }

        fetchProductData();
    }, []);

    const handleAddProduct = (product) => {
        setShowModal(true);
    };

    const handleDeleteProduct = async (product) => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${product.productId}`, { method: 'DELETE' });
        
            if (!response.ok) {
            // If the response status is not in the range 200-299, consider it an error
            const errorData = await response.json();
            throw new Error(`Failed to delete the product: ${errorData.error}`);
            }

            const updatedProducts = products.filter((existingProduct) =>
                existingProduct.productId !== product.productId
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.error(error);
            throw error; // Re-throw the error for further handling or display
        }
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
            console.error(error);
            throw new Error("Error in saving the product");
        }
    }

    const handleUpdateProduct = async (product) => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${product.productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
        
            if (!response.ok) {
                // If the response status is not in the range 200-299, consider it an error
                const errorMessage = `Failed to update the product: ${response.statusText}`;
                throw new Error(errorMessage);
            }
        
            const updatedProduct = await response.json();

            // Perform the edit operation and update the products state
            const updatedProducts = products.map((existingProduct) =>
                existingProduct.productId === updatedProduct.productId ? updatedProduct : existingProduct
            );
            setProducts(updatedProducts);

            // call handleModalClose if no error
            handleModalClose();
        } catch (error) {
            console.error(error);
            throw new Error("Error in updating the product");
        }
    };

    const handleSaveProduct = async (product) => {
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

    const onScrumMasterSearch = searchTerm => {
        setDeveloperSearchTerm("");
        setScrumMasterSearchTerm(searchTerm);
        if (searchTerm === "") {
            setProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(
                (product) => product.scrumMasterName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setProducts(filteredProducts);
        }
    }

    const onDeveloperSearch = searchTerm => {
        setScrumMasterSearchTerm("");
        setDeveloperSearchTerm(searchTerm);
        if (searchTerm === "") {
            setProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(
                (product) => product.developers.some(developer => developer.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setProducts(filteredProducts);
        }
    }

    const onClearSearch = () => {
        setScrumMasterSearchTerm("");
        setDeveloperSearchTerm("");
        setProducts(allProducts);
    }

    return <>
        <HealthCheck />
        <div className="container">
            <div className="product-heading">
                <h1>Products Table</h1>
                <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Add New Product</button>
            </div>
            <div className="search-product">
                <SearchBar searchType="Scrum Master" searchTerm={scrumMasterSearchTerm} onSearch={onScrumMasterSearch}/>
                <SearchBar searchType="Developer" searchTerm={developerSearchTerm} onSearch={onDeveloperSearch}/>
                <button className="btn btn-warning" onClick={onClearSearch}>
                    Clear Search
                </button>
            </div>
            <ProductTable
                products={products}
                handleDeleteProduct={handleDeleteProduct}
                handleEditProduct={handleEditProduct}
            />
            {   showModal && 
                <ProductModal
                    showModal={showModal}
                    product={selectedProduct}
                    onSave={handleSaveProduct}
                    onClose={handleModalClose}
                />
            }
        </div>
    </>
}

export default App;