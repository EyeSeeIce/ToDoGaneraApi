const { compare } = require('bcrypt')

const validatePassword = async (password, bdPassword) => {
  return await compare(password, bdPassword)
}

module.exports = validatePassword
