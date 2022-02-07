const { Model, DataTypes } = requrie('sequelize');

const { initial } = require('lodash');
const sequelize = require ('../config/connection.js');

class Tag extends Model { }

Tag initial(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tag_name: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tag',
    }
);

module.exports = Tag;