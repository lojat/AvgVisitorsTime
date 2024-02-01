const express = require('express');
const router = require('./src/routes');
const sequelize = require('./src/utils/db');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(router)

const PORT = process.env.Port || 3000;

// starting server
app.listen(PORT, (req, res) => {
    console.log(`Server is up and running on port: ${PORT}`);
});

