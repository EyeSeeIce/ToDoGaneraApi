const { sign } = require('jsonwebtoken')

const generateAccessToken = payload => {

  return sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_ACCESS_TOKEN,
  })
}

module.exports = generateAccessToken
