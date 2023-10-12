import React from 'react';
import Table from 'react-bootstrap/Table';

const ProductTable = ({ products, handleEditProduct, handleDeleteProduct}) => {
    const handleProductNameClick = (e, product) => {
        handleEditProduct(product);
        e.preventDefault();
    }

    return <> 
        <div>
            <p>Number of products: {products.length}</p>
        </div>
        <Table className="table table-bordered" responsive>
            <thead>
            <tr>
                <th>Product</th>
                <th>Product Name</th>
                <th>Product Owner</th>
                <th>Developers</th>
                <th>Scrum Master</th>
                <th>Start Date</th>
                <th>Methodology</th>
                <th>Location</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
                <tr key={product.productId}>
                    <td>{index+1}</td>
                    <td>
                        <a href="#edit" onClick={(e) => handleProductNameClick(e, product)}>
                            {product.productName}
                        </a>
                    </td>
                    <td>{product.productOwnerName}</td>
                    <td>{product.developers.join(", ")}</td>
                    <td>{product.scrumMasterName}</td>
                    <td>{product.startDate}</td>
                    <td>{product.methodology}</td>
                    <td>
                        <a href={product.location} target="_blank" rel="noopener noreferrer">
                            View Location
                        </a>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteProduct(product)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    </>
};

export default ProductTable;
