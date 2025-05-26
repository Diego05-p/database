const UserRole = require("../models/userRole.model");
const response = require("../red/response");

const assign = async (req, res, next) => {
  try {
    const { userId, roleId } = req.body;
    await UserRole.sync();

    const assignment = await UserRole.create({
      userId,
      roleId,
    });

    const message = {
      msg: "Role assigned to user",
      id: assignment.id,
    };

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const assignments = await UserRole.findAll();
    response.success(req, res, assignments, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  assign,
  getAll,
};
