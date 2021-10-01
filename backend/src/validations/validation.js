const utils = {
  isEmpty: (str) => !str,
  isOnlyNumber: (str) => !str.match(/[^0-9]/),
  isValidLength: (str, length) => str.length >= length,
  isValidMaxLength: (str, length) => str.length <= length,
  isValidEmail: (str) => /\S+@\S+.\S+/.test(str),
  isOnlyLetters: (str) => !str.match(/[^a-z ]/igm),
  isDoubleSpaced: (str) => str.match('  ') != null,
  isSpaced: (str) => str.match(/[ ]/) != null,
  isOnlyLettersAndDashs: (str) => !str.match(/[^0-9- ]/igm),
  isValidGender: (str) => !str.match(/[^mfo ]/igm)
}

const strings = (string, res, value, length) => {
  if (string === undefined || utils.isEmpty(string) || !utils.isValidLength(string, length)) {
    res.statusCode = 406
    res.json({
      status: false,
      msg: 'O campo ' + value + ' deve ter pelo menos ' + length + ' caracteres. '
    })
    res.utilized = true
    return false
  }
}

const userValidation = {
  userName: (userName, res) => {
    if(userName == undefined || utils.isEmpty(userName) || !utils.isValidLength(userName, 3)){
        res.statusCode = 406;
        res.json({
            status: false,
            msg: "O nome de usuário deve ter pelo menos 3 caracteres"
        });
        res.utilized = true
        return false;
    }else if(utils.isSpaced(userName)){
        res.statusCode = 406;
        res.json({
            status: false,
            msg: "O nome de usuário não deve ter espaços"
        });
        res.utilized = true
        return false;
    }
  },
  password: (password, res) => {
    if (!utils.isValidLength(password, 8)) {
      res.statusCode = 406
      res.json({
        status: false,
        msg: 'A senha deve ter pelo menos 8 caracteres. '
      })
      res.utilized = true
      return false
    }
  }
}

module.exports = userValidation
