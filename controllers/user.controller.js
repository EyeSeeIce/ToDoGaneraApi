const user = require('../services/User')
const formDataParser = require('../utils/formDataParser')

const getOne = async (req, res) => {
  try {
    const { params: { uuid } } = req

    const response = await user.getOne({ uuid })
    res.send({
      message: 'Type has been created',
      data: response
    })
  } catch (e) {
    res.status(400).send({ data: e.message, errors: e.errors?.map(e => ({ field: e.path, message: e.message })) })
  }
}

const create = async (req, res) => {
  try {
    const { fields, files } = await formDataParser(req)

    const userDataForCreate = {
      ...fields,
      avatar: files
    }
    await user.create(userDataForCreate)

    res.send({
      message: 'User has been created',
    })
  } catch (e) {
    res.status(400).send({ data: e.message, errors: e.errors?.map(e => ({ field: e.path, message: e.message })) })
  }
}

module.exports = {
  getOne, create
}
