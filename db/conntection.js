const { Sequelize } = require('sequelize')

const s = new Sequelize('default_db', 'gen_user', 'pj2lqupri0', {
  host: '92.255.77.129',
  dialect: 'postgres',
})

export default s
