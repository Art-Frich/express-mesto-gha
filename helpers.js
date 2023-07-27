const fullerConsoleLine = '###################################################### -_- #####################################################';
const NOT_ROUTE_MSG = { message: 'Пожалуйста ознакомьтесь с API сервера для обращения к корректным роутам. https://github.com/Art-Frich/express-mesto-gha' };

const NOT_USER_TEXT = 'Пользователь не найден';
const NOT_CARD_TEXT = 'Не удалось найти карточку';
const NOT_CARDS_TEXT = 'Пока нет ни одной созданной карточки';
const NOT_USERS_TEXT = 'Пока нет ни одного зарегистрированного пользователя';
const UNCORRECT_DATA_TEXT = 'Переданные данные некорректны. ';
const UNCORRECT_AUTH_TEXT = 'Неправильная почта или пароль.';
const NOT_AUTH_TEXT = 'Необходима авторизация';
const ALIEN_CARD_TEXT = 'Вы не можете удалять чужие карточки';
const USER_EXIST_TEXT = 'Пользователь с таким email уже зарегистрирован';

const NOT_FOUND_STATUS = 404;
const ERROR_DEFAULT_STATUS = 500;
const UNCORRECT_DATA_STATUS = 400;
const SUCCES_CREATE_STATUS = 201;
const UNCORRECT_AUTH_STATUS = 401;
const ALIEN_CARD_STATUS = 403;
const USER_EXIST_STATUS = 409;

// eslint-disable-next-line no-useless-escape
const regExpUrl = /^(http|https):\/\/[\w\-._~:/?#[\]@!\$&'()\*\+,;=]{2,}#*$/;
const regExpEmail = /[\w]+@[\w]+\.[a-z]{2,}/;

const options = {
  serverSelectionTimeoutMS: 5000,
  family: 4,
};

const handleAppError = (err) => console.log(`Произошла ошибка: ${err.name} ${err.message}. \n${err.stack}`);

module.exports = {
  NOT_ROUTE_MSG,
  NOT_USER_TEXT,
  NOT_CARD_TEXT,
  NOT_USERS_TEXT,
  NOT_FOUND_STATUS,
  ERROR_DEFAULT_STATUS,
  SUCCES_CREATE_STATUS,
  NOT_CARDS_TEXT,
  UNCORRECT_DATA_STATUS,
  UNCORRECT_DATA_TEXT,
  UNCORRECT_AUTH_TEXT,
  UNCORRECT_AUTH_STATUS,
  NOT_AUTH_TEXT,
  ALIEN_CARD_TEXT,
  ALIEN_CARD_STATUS,
  USER_EXIST_TEXT,
  USER_EXIST_STATUS,

  regExpUrl,
  regExpEmail,
  options,
  fullerConsoleLine,

  handleAppError,
};
