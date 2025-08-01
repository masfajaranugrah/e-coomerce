import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("buyer", "seller", "admin"),
        defaultValue: "buyer",
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // address
    alamat_jalan: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    kelurahan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    kecamatan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    kabupaten_kota: {
        type: DataTypes.STRING,
        allowNull: true
    },
    provinsi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    kode_pos: {
        type: DataTypes.STRING,
        allowNull: true
    },

    avatar_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    verification_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    verification_token_expiry: {
        type: DataTypes.DATE,
        allowNull: true
    },
    reset_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reset_token_expiry: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    tableName: 'users',
    timestamps: true,
});

export default Users;