const bcrypt = require('bcrypt');
const { HttpException, AuthHelper } = require('../helpers');
const { providers } = require('../providers');
class Auth {
  constructor() {}

  async registration({ email, password }) {
    const user = await providers.Auth.getUser({ email });
    if (user) {
      throw HttpException.CONFLICT('Failed! Conflict, the email still exist!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const credentials = { email, password: hashedPassword };
    const createdUser = await providers.Auth.createUser(credentials);
    if (!createdUser) {
      throw HttpException.INTERNAL_SERVER_ERROR();
    }

    const token = await AuthHelper.createToken({
      id: createdUser._id,
      email,
    });
    const newAccessToken = await AuthHelper.createAccessToken({
      id: createdUser._id,
      email,
    });
    const newRefreshToken = await AuthHelper.createRefreshToken({
      id: createdUser._id,
      email,
    });
    createdUser.token = token;
    (createdUser.accessToken = newAccessToken),
      (createdUser.refreshToken = newRefreshToken),
      await createdUser.save();
    const {
      _id,
      accessToken,
      refreshToken,
      avatarURL,
      newUser,
      name,
      birthday,
      phone,
      city,
    } = createdUser;
    const dataToSend = {
      _id,
      email,
      token,
      accessToken,
      refreshToken,
      avatarURL,
      newUser,
      name,
      birthday,
      phone,
      city,
    };
    return dataToSend;
  }

  async login({ email, password }) {
    const user = await providers.Auth.getUser({ email });
    if (!user) {
      throw HttpException.UNAUTHORIZED('Failed! Invalid email or password');
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      throw HttpException.UNAUTHORIZED('Failed! Invalid email or password ');
    }

    const newToken = await AuthHelper.createToken({ id: user._id, email });
    const newAccessToken = await AuthHelper.createAccessToken({
      id: user._id,
      email,
    });
    const newRefreshToken = await AuthHelper.createRefreshToken({
      id: user._id,
      email,
    });

    (user.token = newToken),
      (user.newUser = false),
      (user.accessToken = newAccessToken),
      (user.refreshToken = newRefreshToken),
      await user.save();
    const {
      _id,
      token,
      accessToken,
      refreshToken,
      avatarURL,
      newUser,
      name,
      birthday,
      phone,
      city,
    } = user;
    const dataToSend = {
      _id,
      email,
      token,
      accessToken,
      refreshToken,
      avatarURL,
      newUser,
      name,
      birthday,
      phone,
      city,
    };
    return dataToSend;
  }
  async logout(id) {
    const body = { token: null, accessToken: null, refreshToken: null };
    const { _id, email } = await providers.Auth.updateUser(id, body);
    const dataToSend = { _id, email };
    return dataToSend;
  }
  async current(id) {
    const { _id, email } = await providers.Auth.getUserById(id);
    const dataToSend = { _id, email };
    return dataToSend;
  }
  async updateData(id, dataToUpdate) {
    const { _id, email } = await providers.Auth.updateUser(id, dataToUpdate);

    const dataToSend = {
      _id,
      email,
      avatarURL,
      newUser,
      name,
      birthday,
      phone,
      city,
    };
    return dataToSend;
  }
  async refreshing(userData) {
    const accessToken = await AuthHelper.createAccessToken({ ...userData });
    const refreshToken = await AuthHelper.createAccessToken({ ...userData });
    await providers.Auth.updateUser(userData.id, {
      accessToken,
      refreshToken,
    });
    return { accessToken, refreshToken };
  }
}
module.exports = new Auth();
