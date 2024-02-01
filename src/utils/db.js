const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_Name, process.env.DB_UserName, process.env.DB_PASS||'123456', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

// Test the database connection
(async function startConnection() {
    try {
        await sequelize.authenticate();
        sequelize.sync();
        console.log("Database connected and synced!");
    } catch (error) {
        console.error("Error in database connection:", error.message);
    }
})();


module.exports = sequelize;