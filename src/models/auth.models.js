const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Auth = sequelize.define("Auth", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
}, {
  tableName: "auth",
  timestamps: false,
});

module.exports = Auth;
