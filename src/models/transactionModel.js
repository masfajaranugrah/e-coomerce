// models/transactionModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transaction = sequelize.define("transaction", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    status: {
        type: DataTypes.ENUM("pending", "paid", "failed", "challenge", "canceled", "expired", "denied"),
        defaultValue: "pending",
    },

    snapToken: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "transactions",
    timestamps: true,
    freezeTableName: true,
});


export default Transaction;
