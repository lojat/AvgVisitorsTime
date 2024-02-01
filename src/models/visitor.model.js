const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db')

const Visitors = sequelize.define('Visitors', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    entryTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    exitTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: false
});

module.exports = Visitors;