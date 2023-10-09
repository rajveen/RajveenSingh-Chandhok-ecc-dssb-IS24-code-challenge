import express from 'express';
import cors from 'cors';
import getMockProducts from './data/mockProducts.js';

const app = express();
app.use(cors());
app.use(express.json());

let mockProducts = getMockProducts();

app.get("/health-check", (req, res) => {
    res.json({ message: "Server is healthy!" });
});

app.get("/api/products", (req, res) => {
    res.json({ products: mockProducts });
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000.`);
});