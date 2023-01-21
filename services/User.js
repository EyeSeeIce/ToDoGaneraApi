const ModelUser = require('../model/User')
const generateAccessToken = require('../utils/tokenService')

class User {
  async create(data) {
    try {
      const { user_name, user_password } = data


      const user = await ModelUser.create({ user_name, user_password })
      await user.save()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async auth(data) {

    const response = await ModelUser.findOne({
      where: {
        user_name: data.user_name
      }
    })

    if (!response) {
      return Promise.reject({
        message: 'User not found',
        errors: [{
          path: 'email',
          message: 'User not found'
        }
        ]
      })
    }

    const valid = await response.validPassword(data.user_password, response.dataValues.user_password)

    if (!valid) {
      return Promise.reject({
        message: 'Wrong login or password',
        errors: [{
          path: 'email',
          message: 'Wrong login or password'
        },
          {
            path: 'user_password',
            message: 'Wrong login or password'
          }
        ]
      })
    }

    return generateAccessToken(response.dataValues)
  }

  async getOne({ uuid }) {
    const candidate = await ModelUser.findOne({
      where: {
        uuid
      },
      attributes: { exclude: ['user_password', 'createdAt', 'updatedAt'] }
    })
    if (!candidate) {
      return Promise.reject({
        message: 'User not found'
      })
    }
    const links = await candidate.getLinks({
      attributes: { exclude: ['createdAt', 'updatedAt', 'user_id'] }
    })

    return {
      ...candidate.dataValues,
      links
    }
  }
}


const user = new User()

module.exports = user
