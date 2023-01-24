const express = require('express')
const cors = require('cors')
const authOnly = require('./middlewares/auth.middleware')
const authRouter = require('./routes/auth.router')
const userRouter = require('./routes/user.router')
const todoRouter = require('./routes/todo.router')
const s = require('./db/conntection')
const ModelTodo = require('./model/Todo')

require('dotenv').config({ path: `.env` })

const app = express()

app.use(
  cors({
    origin: '*',
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', [authOnly], userRouter)
app.use('/api/v1/todo', [authOnly], todoRouter)


app.use('/api/v1/orm/sync', () => ModelTodo.sync({ force: true }))


app.use('/api/v1/test', async (req, res) => {
  try {
    res.send('qwe')
  } catch (e) {
    res.send(e)
  }

})


app.listen(4000, async () => {
  try {
    await s.authenticate()

  } catch (error) {

  }
})

