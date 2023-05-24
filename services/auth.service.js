const bcrypt = require('bcrypt');
const { HttpException, AuthHelper, CloudinaryHelper } = require('../helpers');
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

    const newAccessToken = await AuthHelper.createAccessToken({
      id: createdUser._id,
      email,
    });
    const newRefreshToken = await AuthHelper.createRefreshToken({
      id: createdUser._id,
      email,
    });
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

    const newAccessToken = await AuthHelper.createAccessToken({
      id: user._id,
      email,
    });
    const newRefreshToken = await AuthHelper.createRefreshToken({
      id: user._id,
      email,
    });

    (user.newUser = false),
      (user.accessToken = newAccessToken),
      (user.refreshToken = newRefreshToken),
      await user.save();
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
    } = user;
    const dataToSend = {
      _id,
      email,
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
    const body = { accessToken: null, refreshToken: null };
    const { _id, email } = await providers.Auth.updateUser(id, body);

    const dataToSend = { _id, email };
    return dataToSend;
  }
  async current(id) {
    const {
      _id,
      email,
      accessToken,
      refreshToken,
      avatarURL,
      newUser,
      name,
      birthday,
      phone,
      city,
    } = await providers.Auth.getUserById(id);
    if (!accessToken || !refreshToken) {
      throw HttpException.UNAUTHORIZED();
    }
    const dataToSend = {
      _id,
      email,
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
  async updateData(id, { body, file }) {
    const path = file?.path ? file.path : null;
    const userNewData = { ...body };
    const getAllUsers = await providers.Auth.getAllUsers({});
    if (
      typeof getAllUsers === 'object' &&
      getAllUsers.some(user => user.email === userNewData.email)
    ) {
      throw HttpException.CONFLICT(
        `The provided email: "${userNewData.email}" still exist!`
      );
    }
    if (!path) {
      const { _id, email, avatarURL, name, birthday, phone, city } =
        await providers.Auth.updateUser(id, { ...userNewData });

      return {
        _id,
        email,
        avatarURL,
        name,
        birthday,
        phone,
        city,
      };
    }
    const { _id, email, avatarURL, name, birthday, phone, city } =
      await providers.Auth.updateUser(id, { avatarURL: path, ...userNewData });

    return { _id, email, avatarURL, name, birthday, phone, city };
  }
  async refreshing({ email, id }) {
    const accessToken = await AuthHelper.createAccessToken({ id, email });
    const refreshToken = await AuthHelper.createRefreshToken({ id, email });
    await providers.Auth.updateUser(id, {
      accessToken,
      refreshToken,
    });
    return { accessToken, refreshToken };
  }
}
module.exports = new Auth();
