const ModelTodo = require('../model/Todo')
const { re } = require('@babel/core/lib/vendor/import-meta-resolve')

class Todo {
  async create({ title, description, user_id }) {

    const todo = await ModelTodo.create({
      description, title, user_id,
    })
  }

  async getAll({ id }) {
    return await ModelTodo.findAll({
      where: {
        user_id: id,
      },
    })
  }

  async update({ todo_id, user_id, title, description }) {
    const todo = await ModelTodo.findOne({
      where: {
        id: todo_id,
        user_id
      },
    })

    if (todo) {
      if (title) {
        todo.title = title
      }
      if (description) {
        todo.description = description
      }

      await todo.save()
    } else {
      return Promise.reject()
    }
  }

  async delete({ user_id, todo_id}) {
    try {
      const todo = await ModelTodo.findOne({
        where: {
          id: todo_id,
          user_id
        },
      })
      await todo.destroy()
    } catch (e) {
      return Promise.reject()
    }
  }

  async complete({ user_id, todo_id}) {
    try {
      const todo = await ModelTodo.findOne({
        where: {
          id: todo_id,
          user_id
        },
      })

      todo.status = !todo.status
      await todo.save()
    } catch (e) {
      return Promise.reject()
    }
  }
}

const todo = new Todo()

module.exports = todo
