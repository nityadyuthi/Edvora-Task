module.exports.createPermissionError = (code, message) => {
  const err = new Error(message);
  err.code = code;
  err.type = "Permission Error";
  return err;
};

// module.exports.createValidationError = (code, message) => {
//   const err = new Error(message);
//   err.code = code;
//   err.type = "Validation Error";
//   return err;
// };
