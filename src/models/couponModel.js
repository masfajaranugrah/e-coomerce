import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Coupon = sequelize.define('coupons', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  type: {
    type: DataTypes.ENUM('percent', 'fixed'),
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  usage_limit: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  used_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'coupons',
  timestamps: false
});

export default Coupon;
