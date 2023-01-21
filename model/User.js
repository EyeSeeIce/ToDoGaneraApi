const { DataTypes, Model, UUIDV4 } = require('sequelize')
const s = require('../db/conntection')
const { compare, compareSync, genSaltSync, hash, hashSync } = require('bcrypt')

const Todo = require('../model/Todo')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This username already exist'
      },
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: s,
    tableName: 'user',
    hooks: {
      beforeCreate: async (user) => {
        if (user.user_password) {
          const salt = await genSaltSync(10, 'a');
          user.user_password = hashSync(user.user_password, salt);
        }
      },
    },
    instanceMethods: {
      generateHash(password) {
        return hash(password, genSaltSync(8));
      },
      validPassword(password) {
        return compare(password, this.password);
      }
    }
  },
)

User.prototype.validPassword = async (password, hash) => {
  return await compareSync(password, hash);
}

User.hasMany(Todo, {
  foreignKey: 'user_id'
})

Todo.belongsTo(User, {
  foreignKey: 'user_id',
})

module.exports = User
