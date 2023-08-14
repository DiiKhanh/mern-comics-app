import userModel from '../models/user.model.js';
import responseHandler from '../handlers/response.handler.js';
import jsonwebtoken from 'jsonwebtoken';

const signup = async (req, res) => {
  try {
    const { username, email, displayName, password } = req.body;
    const checkUser = await userModel.findOne({ username });
    const checkEmail = await userModel.findOne({ email });
    if (checkUser) return responseHandler.badrequest(res, 'Username already used');
    if (checkEmail) return responseHandler.badrequest(res, 'Email already used');

    const user = new userModel();
    user.username = username;
    user.email = email;
    user.displayName = displayName;
    user.setPassword(password);
    await user.save();

    const token = jsonwebtoken.sign({ data: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: '24h'
    });

    return responseHandler.created(res, {
      token,
      id: user.id,
      ...user._doc
    });

  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username }).select('username password salt id displayname email');

    if (!user) return responseHandler.badrequest(res, 'User not exist');
    if (!user.validPassword(password)) return responseHandler.badrequest(res, 'Wrong password');

    const token = jsonwebtoken.sign({ data: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: '24h'
    });

    user.password = undefined;
    user.salt = undefined;

    return responseHandler.ok(res, {
      token,
      id: user.id,
      ...user._doc
    });

  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel.findById(req.user.id).select('password salt id');
    if (!user) return responseHandler.unauthorize(res);
    if (!user.validPassword(password)) return responseHandler.badrequest(res, 'Wrong password');

    user.setPassword(newPassword);
    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return responseHandler.notfound(res);
    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default { signup, signin, getInfo, updatePassword };