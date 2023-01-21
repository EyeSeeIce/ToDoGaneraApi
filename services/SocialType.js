import Model from '../model/SocialType'

class Link {
  async create({ value, title, domain, user_id }) {
    await Model.create({
      domain, title, value, creator_id: user_id
    })
  }
}

const todo = new Link()

module.exports = todo
