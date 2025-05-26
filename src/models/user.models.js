const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "users",
  timestamps: false,
});

module.exports = User;
