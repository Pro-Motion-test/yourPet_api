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
}
module.exports = new Auth();
