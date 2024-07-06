const { v4: uuidv4 } = require('uuid');
const db = require('../config');
const products = db.collection('products');

exports.getProducts = async (req, res) => {
    const snapshot = await products.get();
    const list = snapshot.docs.map(doc => doc.data());
    res.send(list);
};

exports.addProduct = async (req, res) => {
    const newData = req.body;
    newData.id = uuidv4();
    try {
        await products.doc(newData.id).set(newData);
        res.send({ message: 'Product added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        await products.doc(id).update(data);
        res.send({ message: 'Updated Product Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        await products.doc(id).delete();
        res.send({ message: 'Deleted Product Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};