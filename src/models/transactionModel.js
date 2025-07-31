import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const transactionModel = sequelize.define('transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    productId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    amount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    snapToken: DataTypes.STRING,
},
    {
        tableName: 'transaction',
        timestamps: true,
        freezeTableName: true
    }
);

export default transactionModel;
