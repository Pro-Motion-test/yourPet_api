const { providers } = require('../providers');

class Friends {
  constructor() {}
    async getFriendsList() {
    const friends = await providers.Friends.getFriends();
    return friends;
  }
}

module.exports = new Friends();