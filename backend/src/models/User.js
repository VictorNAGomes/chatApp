const knex = require('../database/database')

class User {
  async create (data) {
    const user = await knex.insert(data).table('users')
    return user
  }

  async findByName (userName) {
    const user = await knex.select().table('users').where({userName})
    return user
  }

  async findAll () {
    const users = await knex.select().table('users')
    return users
  }

  async findById (id) {
    const user = await knex.select().table('users').where({id})
    return user
  }

  async search (userName) {
    const users = await knex.select('id', 'userName').table('users').where('userName', 'like', '%'+ userName +'%')
    return users
  }
}

module.exports = new User()