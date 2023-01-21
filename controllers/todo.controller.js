const todo = require('../services/Todo')

const create = async (req, res) => {
  try {
    const {
      body: { title, description },
      user_id
    } = req

    await todo.create({
      title, description, user_id
    })

    res.send({
      message: 'Todo has been created',
    })
  } catch (e) {

    res.status(400).send({ message: e.errors?.map(e => ({ field: e.path, message: e.message })) })
  }
}

const getAll = async (req, res) => {
  try {
    const {
      user_id
    } = req
    const todos = await todo.getAll({ id: user_id })

    res.send({
      todos,
    })
  } catch (e) {
    res.status(400).send({ message: e.errors?.map(e => ({ field: e.path, message: e.message })) })
  }
}

const update = async (req, res) => {
  try {
    const { user_id, body: { title, description }, params: { id }} = req

    await todo.update({ todo_id: id, user_id, description, title})

    res.send({
      message: 'updated'
    })
  }catch (e) {

    res.status(400).send({ message: 'Something went wrong'})
  }
}

export default {
  create, getAll, update
}
