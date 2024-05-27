const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({ error }));
}

exports.createProduct = (req, res, next) => {
    delete req.body._id;
    const product = new Product({
        ...req.body
    });
    product.save()
        .then(() => res.status(201).json({ message: 'Product created!' }))
        .catch(error => res.status(400).json({ error }));
}

exports.updateProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then(product => {
            if (product) {
                Product.updateOne({ _id: req.params.id }, { ...req.body })
                    .then(() => res.status(200).json({ message: 'Product updated!' }))
                    .catch(error => res.status(400).json({ error }))
            } else {
                res.status(400).json({ message: 'Product not found!' });
            }
        })
        .catch(error => res.status(400).json({ message: 'Product not found!' }));

}

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Product deleted!' }))
        .catch(error => res.status(400).json({ error }))
}