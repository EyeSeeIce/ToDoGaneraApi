const socialTypeService = require('../services/SocialType')

const create = async (req, res) => {
  try {
    const {
      body: { value, title, domain },
      user_id,
    } = req

    await socialTypeService.create({
      value, title, user_id, domain
    })

    res.send({
      message: 'Type has been created',
    })
  } catch (e) {
    res.status(400).send({ message: e.errors?.map(e => ({ field: e.path, message: e.message })) })
  }
}

export default {
  create
}
