const Role = require("../models/role.model");
const response = require("../red/response");

const getAll = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    response.success(req, res, roles, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await Role.sync();

    const newRole = await Role.create({
      name: data.name,
    });

    const message = {
      msg: "Role created successfully",
      id: newRole.id,
    };

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
};
