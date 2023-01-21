const user = require('../services/User')

const jwt = require('jsonwebtoken')

const create = async (req, res) => {
  try {
    await user.create(req.body)

    res.send({
      message: 'User has been created',
    })
  } catch (e) {
    res.status(400).send({ message: '', errors: e.errors?.map(e => ({ field: e.path, message: e.message })) })
  }
}

const auth = async (req, res) => {
  try {
    const { user_name, user_password } = req.body
    const accessToken = await user.auth({ user_name, user_password })

    res.send({
      data: { token: accessToken  }
    })
  } catch (e) {

    res.status(400).send({ message: e.message, errors: e.errors?.map(e => ({ field: e.path, message: e.message })) })
  }
}

const check = async (req, res) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      throw new Error()
    }

    await jwt.verify(token, process.env.JWT_SECRET_KEY)

    res.status(200).send({
      data: {
        message: 'ok',
      },
    })
  } catch (e) {
    res.status(403).send({
      message: 'Unauthorized',
    })
  }
}

module.exports = {
  create,
  auth,
  check,
}
