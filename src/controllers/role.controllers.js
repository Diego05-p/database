const User = require("../models/user.model");
const response = require("../red/response");
const bcrypt = require("bcrypt");

const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll();
    response.success(req, res, users, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await User.sync();

    const hashedPassword = await bcrypt.hash(data.password.toString(), 10);

    const newUser = await User.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role_id: data.role_id || null,
    });

    response.success(req, res, { msg: "User created successfully", id: newUser.id }, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
};

