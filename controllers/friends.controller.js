const { responseTemplates } = require('../constants');
const services = require('../services');

class Friends {
  constructor() {}

  static async getAllFriends(req, res, next) {
    try {
      const friendsList = await services.Friends.getFriendsList(req.body);
      //  --RESPONSE--
      return res.json(friendsList);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = Friends;
