// models/transactionItemModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TransactionItem = sequelize.define("transactionItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  transactionId: {
      type: DataTypes.UUID,
  allowNull: false,
  references: {
    model: "transactions", // pastikan sesuai nama tabel (bukan model JS)
    key: "id",
  },
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  couponId: {
  type: DataTypes.UUID,
  allowNull: true,
  references: {
    model: 'coupons',
    key: 'id'
  }
},
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "transaction_items",
  timestamps: false,
  freezeTableName: true,
});

export default TransactionItem;
