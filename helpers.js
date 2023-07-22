const fullerConsoleLine = '###################################################### -_- #####################################################';
const NOT_ROUTE_MSG = { message: 'Пожалуйста ознакомьтесь с API сервера, для обращения к корректным роутам. https://github.com/Art-Frich/express-mesto-gha' };
const NOT_USER_MSG = { message: 'Пользователь не найден' };
const NOT_CARD_MSG = { message: 'Не удалось найти карточку' };
// const NOT_CARDS_TEXT = 'Пока нет ни одной созданной карточки';
const NOT_USERS_TEXT = 'Пока нет ни одного зарегистрированного пользователя';
const UNCORRECT_DATA_TEXT = 'Переданные данные некорректны. ';
const NOT_FOUND_STATUS = 404;
const ERROR_DEFAULT_STATUS = 500;
const UNCORRECT_DATA_STATUS = 400;

const options = {
  serverSelectionTimeoutMS: 5000,
  family: 4,
};

// functions
const handleAppError = (err) => console.log(`Произошла ошибка: ${err.name} ${err.message}`);
const handleContorllersError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(UNCORRECT_DATA_STATUS).send({ message: UNCORRECT_DATA_TEXT + err.message });
  }
  if (err.name === 'RangeError' && /cards/.test(err.stack)) {
    return res.status(NOT_FOUND_STATUS).send(NOT_CARD_MSG);
  }
  if (err.name === 'RangeError' && /users/.test(err.stack)) {
    return res.status(NOT_FOUND_STATUS).send(NOT_USER_MSG);
  }
  return res.status(ERROR_DEFAULT_STATUS).send({ message: err.message });
};
const getId = (req) => req.user._id;
const isExist = (data) => {
  if (!data) {
    return false;
  }
  return true;
};

module.exports = {
  NOT_ROUTE_MSG,
  // NOT_CARDS_TEXT,
  NOT_USER_MSG,
  NOT_CARD_MSG,
  NOT_USERS_TEXT,
  NOT_FOUND_STATUS,
  ERROR_DEFAULT_STATUS,

  options,
  fullerConsoleLine,

  handleAppError,
  handleContorllersError,
  getId,
  isExist,
};
