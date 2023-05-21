const validation = Object.freeze({
  minTitle: 2,
  maxTitle: 50,
  minName: 2,
  maxName: 16,
  minBreed: 2,
  maxBreed: 16,
  minLocation: 2,
  maxLocation: 25,
  minComments: 8,
  maxComments: 120,
  sexValues: {
    male: 'male',
    female: 'female',
  },
  categoryValues: {
    sell: 'sell',
    forFree: 'for-free',
    lostFound: 'lost-found',
  },
});

const defParams = Object.freeze({
  limit: 2,
  page: 1,
  category: validation.categoryValues.sell,
});

module.exports = { validation, defParams };
