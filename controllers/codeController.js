const XLSX = require('xlsx');
const db = require('../config');
const codes = db.collection('codes');
const details = db.collection('details');
const generateRandomCode = require('../utils/generateRandomCode');

exports.checkCode = async (req, res) => {
    const { Code, Name, PhoneNumber, Email, City } = req.body;
    
    try {
        // Query for documents where 'Code' field matches the provided value
        const query = codes.where('Code', '==', Code).limit(1);
        const snapshot = await query.get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            res.json({ Valid: false });
            return;
        }

        snapshot.forEach(async (doc) => {
            const data = doc.data();

            if (!data.Verified) {
                const product = data.Product;

                // Use a batch to combine the update and add operations
                const batch = codes.firestore.batch();
                batch.update(doc.ref, { Verified: true });
                const detailsRef = details.doc();
                batch.set(detailsRef, { Name, PhoneNumber, Email, City, Product: product, Code });
                await batch.commit();

                res.status(200).json({ Valid: true });
            } else {
                res.status(200).json({ Valid: false });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.addCodes = async (req, res) => {
    const count = req.body.count;
    const product = req.body.product;
    let codeList = [];
    for (let i = 0; i < count; i++) {
        const verified = false;
        const newCode = generateRandomCode();
        const newData = { Code: newCode, Verified: verified, Product: product };

        try {
            await codes.add(newData);
            codeList.push({
                S_No: i + 1,
                Code: newCode,
                Product: product,
            });
        } catch (error) {
            console.error(error);
        }
    }
    if (codeList.length !== 0) {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(codeList);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Codes');

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        res.setHeader('Content-Disposition', 'attachment; filename="Codes.xlsx"');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(buffer);
    } else {
        res.status(500).send({ message: 'Failed to generate codes' });
    }
};