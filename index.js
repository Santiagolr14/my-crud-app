const express = require ('express');
const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// datos de ejemplo (en un escenario real, usarias una base de datos)
let products = [
    { id: 1, name: 'Producto 1', price: 100},
    { id: 2, name: 'Producto 2', price: 200},
];

// Obtener un producto por ID (GET /products/:id)
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product){
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado'});
    }
});

// Crear un nuevo producto (POST /products)
app.post('/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct);
    res.status(201).json(newProduct);
})

// Actializar un producto (PUT /products/:id)
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateProduct = req.body;
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1){
        products[productIndex] = updateProduct;
        res.json(updateProduct);
    } else {
        res.status(404).json({ message: 'Producto no encontrado'});
    }
});

// Iniciar el servidor 
app.listen(port, () => {
    console.log(`Servidor enlazado en el puerto ${port}`);
});