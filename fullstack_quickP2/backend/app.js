const express = require('express');
const mongoose = require('mongoose');





const app = express();

const Product = require('./models/Product');





mongoose.connect('mongodb+srv://archist:1&Bigcyri@cluster0.61na4.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));





app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/products', (req, res, next) => {
    // delete req.body._id;
    console.log(req.body);
    const product = new Product({
        ...req.body
    });
    product.save()
      .then(product => {console.log(product._id); res.status(201).json({product})})
      .catch(error => res.status(400).json({ error }));
});

app.get('/api/products', (req, res, next) => {
    Product.find()
        .then(products => {res.status(200).json({products})})
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/products/:id', (req, res, next) => {
    console.log(req.params.id);
    Product.findOne({ _id: req.params.id })
        .then(product => {delete product._id;delete product.name; console.log({product}); product._id=JSON.stringify(product.id); res.status(200).json({product})})
        // .then(product => {console.log({product}); console.log(JSON.stringify(product.id)); res.status(200).json({product})})
        .catch(error => res.status(404).json({ error }));
});

app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Modified!'}))
      .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Deleted!'}))
      .catch(error => res.status(400).json({ error }));
});





module.exports = app;