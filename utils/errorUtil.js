const errors_code = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};
exports.error = (message, type) => {
  const error = new Error(message);
  error.code = errors_code[type];
  throw error;
};
