import express from 'express';
import cors from 'cors';
import getMockProducts from './data/mockProducts.js';

const app = express();
app.use(cors());
app.use(express.json());

// Import mock data
let mockProducts = getMockProducts();

// Health endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Healthy' });
});

// Read all products
app.get("/api/products", (req, res) => {
    res.json({ products: mockProducts });
});

// Create a new product
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    mockProducts.push(newProduct);
    res.status(201).json(newProduct);
});

// Read a single product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = mockProducts.find((item) => item.productId === productId);
  
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.json(product);
    }
});

// Update an existing product by ID
app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
  
    const index = mockProducts.findIndex((item) => item.productId === productId);
  
    if (index === -1) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        mockProducts[index] = updatedProduct;
        res.json(updatedProduct);
    }
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const index = mockProducts.findIndex((item) => item.productId === productId);
  
    if (index === -1) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        const deletedProduct = mockProducts.splice(index, 1);
        res.json(deletedProduct[0]);
    }
});

// Error handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});