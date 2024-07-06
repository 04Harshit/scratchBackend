const jwt = require('jsonwebtoken');
const { ADMIN, PASSWORD, SECRET_KEY } = process.env;

exports.login = async (req, res) => {
    const token = req.headers.Authorization;
    if (token) {
        return res.json({ message: 'Already Logged In' });
    }
    const { username, password } = req.body;
    console.log(`username: ${username}, password: ${password}`);
    if (username !== ADMIN || password !== PASSWORD) {
        return res.sendStatus(401);
    }

    const accessToken = jwt.sign({ username, role: 'admin' }, SECRET_KEY, { expiresIn: '1d' });
    res.json({ message: 'Login Successful', token: accessToken });
};