const validation = Object.freeze({
  minTitle: 2,
  maxTitle: 50,
  minName: 2,
  maxName: 16,
  minBreed: 2,
  maxBreed: 16,
  minComments: 8,
  maxComments: 350,
  sexValues: {
    MALE: 'male',
    FEMALE: 'female',
  },
  categoryValues: {
    SELL: 'sell',
    FOR_FREE: 'for-free',
    LOST_FOUND: 'lost-found',
  },
});

const defParams = Object.freeze({
  limit: 12,
  page: 1,
  category: validation.categoryValues.SELL,
});

module.exports = { validation, defParams };
