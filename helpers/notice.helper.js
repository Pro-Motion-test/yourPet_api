const HttpException = require('./HttpException.helper');

class Notice {
  constructor() {}

  static checkCategory(body) {
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
  }

  static isDate(value) {
    const date = new Date(value);
    return !isNaN(date);
  }
}

module.exports = Notice;
