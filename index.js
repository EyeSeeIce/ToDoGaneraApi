import express from 'express'
import s from './db/conntection'
import cors from 'cors'
import authRouter from './routes/auth.router'
import { userRouter } from './routes'
import authOnly from './middlewares/auth.middleware'
import todoRouter from './routes/todo.router'


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


app.use('/api/v1/orm/sync', () => s.sync({ force: true }))


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

