require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Other routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const codeRoutes = require('./routes/codeRoutes');
const detailRoutes = require('./routes/detailRoutes');

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/codes', codeRoutes);
app.use('/details', detailRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});