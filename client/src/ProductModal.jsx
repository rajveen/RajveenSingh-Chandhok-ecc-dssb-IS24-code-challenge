import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import { WithContext as ReactTags } from 'react-tag-input';
import "./developer.css";
import { generateUniqueID } from "./productHelper";

const ProductModal = ({ showModal, product, onSave, onClose }) => {
    const [editedProduct, setEditedProduct] = useState(product);
    const [developers, setDevelopers] = useState(product?.developers.map((developer) => ({ id: developer, text: developer })));

    const handleDevelopersChange = (newDevelopers) => {
        setDevelopers(newDevelopers);
    };

    // useEffect(() => {
    //     setEditedProduct(product)
    // }, [product])

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
        console.log({
            ...editedProduct,
            [name]: value})
    };

    const addProductIdToProduct = (product) => {
        if (!product.productId) {
            const id = generateUniqueID()
            return {
                ...product,
                productId: id
            }
        }
        return product
    }

    const handleSave = () => {
        // Include updated developers in the edited product data
        let updatedProduct = {
            ...editedProduct,
            developers: developers?.map((tag) => tag.text),
        };

        // add unique Id to product
        updatedProduct = addProductIdToProduct(updatedProduct)

        // Call a function to save the edited product data
        onSave(updatedProduct);
    };

    return (
        <Modal show={showModal || product !== undefined} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label style={{fontWeight: "bold"}}>Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="productName"
                            value={editedProduct?.productName || ''}
                            onChange={handleFieldChange}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{fontWeight: "bold"}}>Product Owner</label>
                        <input
                            type="text"
                            className="form-control"
                            name="productOwnerName"
                            value={editedProduct?.productOwnerName || ''}
                            onChange={handleFieldChange}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Developers</label>
                        <ReactTags
                            inline
                            tags={developers}
                            handleDelete={(index) => handleDevelopersChange(developers?.filter((_, i) => i !== index))}
                            handleAddition={(tag) => handleDevelopersChange(developers ? [...developers, tag] : [tag])}
                            placeholder="Add developer"
                        />
                    </div>

                    <div className="form-group">
                        <label style={{fontWeight: "bold"}}>Scrum Master</label>
                        <input
                            type="text"
                            className="form-control"
                            name="scrumMasterName"
                            value={editedProduct?.scrumMasterName || ''}
                            onChange={handleFieldChange}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{fontWeight: "bold"}}>Start Date</label>
                        <div>
                        <DatePicker
                            selected={editedProduct?.startDate ? new Date(editedProduct.startDate) : undefined}
                            onChange={(date) =>
                                setEditedProduct({
                                    ...editedProduct,
                                    startDate: date.toISOString().split('T')[0], // Format as yyyy-mm-dd
                                })
                            }
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <label style={{fontWeight: "bold"}}>Methodology</label>
                        <input
                            type="text"
                            className="form-control"
                            name="methodology"
                            value={editedProduct?.methodology || ''}
                            onChange={handleFieldChange}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{fontWeight: "bold"}}>Location</label>
                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={editedProduct?.location || ''}
                            onChange={handleFieldChange}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {product ? "Update Product" : "Create Product"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductModal;
