const isValidName = function (value) {
  if (/^[A-Z][a-z]\D*$/.test(value)) {
    return true;
  }
  return false;
};

const isValidimage = function (value) {
  const ext = [".jpg", ".jpeg", ".bmp", ".gif", ".png", ".svg"];
  if ((el) => value.endsWith(el)) return true;
  return false;
};

const isValidMobile = function (value) {
  if (/^[0-9]{10}$/.test(value)) return true;
  return false;
};

const isValidpin = function (value) {
  if (/[0-9]\d{4}$/gi.test(value)) return true;
  return false;
};

const isValidEmail = function (value) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true;
  return false;
};

const isValidPassword = function (value) {
  if (
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,}$/.test(
      value
    )
  )
    return true;
  return false;
};

const isValidURL = function (value) {
  if (
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
      value
    )
  )
    return true;
  return false;
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidMobile,
  isValidpin,
  isValidimage,
  isValidURL
};
