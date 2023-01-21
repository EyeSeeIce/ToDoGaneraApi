const jwt = require('jsonwebtoken')

const authOnly = (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    const token = authorization.split(' ')[1]

    if (!token) {
      throw new Error({
        message: 'User not authorisation'
      })
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user_id = decodeToken.id
    next()
  } catch (e) {

    res.status(401).send({ message: 'User not authorisation' })
  }
}

export default authOnly
