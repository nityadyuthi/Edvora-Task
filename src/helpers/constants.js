module.exports = {
  authorizationHeaderName: 'Authorization',
  bearerTokenLabel: 'Bearer ',
  urlValidatorRegex: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
  MAX_LOGIN_INSTANCE: 5,
};
