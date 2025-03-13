const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuari = sequelize.define('Usuari', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    nom: {
        type: DataTypes.STRING
    },
    data_registre: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    idioma: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'usuaris'
});

module.exports = Usuari;