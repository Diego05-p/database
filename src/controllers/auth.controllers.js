const Auth = require("../models/auth.model");
const User = require("../models/user.model");
const response = require("../red/response");
const bcrypt = require("bcrypt");
const auth = require("../auth"); 

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const authData = await Auth.findOne({ where: { email } });
    const userData = await User.findOne({ where: { email } });

    if (!authData || !userData) {
      throw new Error("Email not registered");
    }

    const isValid = await bcrypt.compare(password, authData.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    
    authData.role_id = userData.role_id;

    const token = auth.assignToken({ ...authData.dataValues });
    const result = {
      token,
      user: userData,
    };

    response.success(req, res, result, 200);
  } catch (error) {
    next(error);
  }
};

// Crear nuevo registro en tabla Auth
const create = async (req, res, next) => {
  try {
    const { id, email, password } = req.body;
    await Auth.sync();

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const newAuth = await Auth.create({
      id,
      email,
      password: hashedPassword,
    });

    const message = {
      msg: "Auth record created successfully",
      id: newAuth.id,
    };

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  create,
};
