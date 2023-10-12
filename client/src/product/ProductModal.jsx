import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import { WithContext as ReactTags } from 'react-tag-input';
import "./productModal.css";

const ProductModal = ({ showModal, product, onSave, onClose }) => {
    const [editedProduct, setEditedProduct] = useState(product);
    const [developers, setDevelopers] = useState(product?.developers.map((developer) => ({ id: developer, text: developer })));
    const [error, setError] = useState(null);
    const maxTags = 5;

    const handleDevelopersChange = (newDevelopers) => {
        setDevelopers(newDevelopers);
    };

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

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (developers?.length) { // Save only if developers are non-empty
            
            // Include updated developers in the edited product data
            let updatedProduct = {
                ...editedProduct,
                developers: developers?.map((tag) => tag.text),
            };

            // Call a function to save the edited product data
            try {
                await onSave(updatedProduct);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleAddDevelopers = (tag) => {
        if (!developers || developers.length < maxTags) {
            handleDevelopersChange(developers ? [...developers, tag] : [tag]);
        }
    }

    const renderError = () => {
        if (error) {
            return (
                <div className="alert alert-danger">{error}</div>
            );
        }
        return null;
    };

    return (
        <Modal 
            show={showModal || product !== undefined} 
            onHide={onClose}
            backdrop="static"
            keyboard={false}
        >
            <Form onSubmit={handleSave}>
            <Modal.Header closeButton>
                <Modal.Title>{product ? "Edit Product" : "Add Product"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { renderError() }
                <Form.Group>
                    <Form.Label style={{ fontWeight: 'bold' }}>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="productName"
                        value={editedProduct?.productName || ''}
                        onChange={handleFieldChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ fontWeight: 'bold' }}>Product Owner</Form.Label>
                    <Form.Control
                        type="text"
                        name="productOwnerName"
                        value={editedProduct?.productOwnerName || ''}
                        onChange={handleFieldChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ fontWeight: 'bold' }}>Developers</Form.Label>
                    <ReactTags
                        inline
                        tags={developers}
                        handleDelete={(index) => handleDevelopersChange(developers?.filter((_, i) => i !== index))}
                        handleAddition={handleAddDevelopers}
                        placeholder="Add upto 5 developers"
                        autofocus={false}
                        inputProps={{
                            ...(!developers?.length && {required: true})
                        }}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ fontWeight: 'bold' }}>Scrum Master</Form.Label>
                    <Form.Control
                        type="text"
                        name="scrumMasterName"
                        value={editedProduct?.scrumMasterName || ''}
                        onChange={handleFieldChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ fontWeight: 'bold' }}>Start Date</Form.Label>
                    <div>
                        <DatePicker
                            selected={editedProduct?.startDate ? new Date(editedProduct.startDate) : undefined}
                            onChange={(date) =>
                                setEditedProduct({
                                ...editedProduct,
                                startDate: date.toISOString().split('T')[0], // Format as yyyy-MM-dd
                                })
                            }
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                            required
                        />
                    </div>
                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ fontWeight: 'bold' }}>Methodology</Form.Label>
                    <Form.Control
                        type="text"
                        name="methodology"
                        value={editedProduct?.methodology || ''}
                        onChange={handleFieldChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label style={{ fontWeight: 'bold' }}>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={editedProduct?.location || ''}
                        onChange={handleFieldChange}
                        required
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button type="submit" variant="primary">
                    {product ? "Update & Close" : "Create Product"}
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ProductModal;
