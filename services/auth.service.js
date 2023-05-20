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
    createdUser.token = token;
    await createdUser.save();
    return createdUser;
  }

  async login({ email, password }) {
    const user = await providers.Auth.getUser({ email });
    if (!user) {
    throw HttpException.UNAUTHORIZED('Failed! Unauthorized, you are not a user, please log in or create an account');
  }
const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    throw HttpException.UNAUTHORIZED;
    }
    const token = await AuthHelper.createToken({
      id: user._id,
      email,
    });
    user.token = token;
    await user.save();
    return user;
  }

  async logout(id) {
  const user = await providers.Auth.removeUser(id);
  user.token = null;
  await user.save();
  return user;
  }

  async current(id) {
  const user = await providers.Auth.getUserById(id);
  return user;
  }
}
module.exports = new Auth();
