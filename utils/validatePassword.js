import { compare } from 'bcrypt'

const validatePassword = async (password, bdPassword) => {
  return await compare(password, bdPassword)
}

export default validatePassword
