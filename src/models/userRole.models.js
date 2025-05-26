const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const UserRole = sequelize.define("UserRole", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "user_roles",
  timestamps: false,
});

module.exports = UserRole;
