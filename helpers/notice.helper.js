const HttpException = require('./HttpException.helper');

class Notice {
  constructor() {}

  static checkCategory(body) {
    // try {
    const { category, price } = body;

    if (category === 'sell' && !price) {
      throw HttpException.BAD_REQUEST(
        `For sell-notice must be required field "price"`
      );
    }

    if (category !== 'sell' && price) {
      throw HttpException.BAD_REQUEST(
        `For for-free-notice or lost-found-notice mustn't be field "price"`
      );
    }

    // return {};
    // } catch (error) {
    //   return { error };
    // }
  }
}

module.exports = Notice;
