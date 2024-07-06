const db = require('../config');
const details = db.collection('details');

exports.getDetails = async (req, res) => {
    try {
        const snapshot = await details.get();
        const list = snapshot.docs.map(doc => doc.data());

        const { product = "", city = "" } = req.query;

        const filteredList = list.filter(item => {
            const productMatch = product === "" || item.Product === product;
            const cityMatch = city === "" || item.City === city;
            return productMatch && cityMatch;
        });

        res.status(200).json({ count: filteredList.length, list: filteredList });
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ error: "Failed to fetch details" });
    }
};