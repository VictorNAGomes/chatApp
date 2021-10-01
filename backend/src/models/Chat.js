const knex = require('../database/database')

class Chat {
  async sendInvitation (data) {
    const invite = await knex.insert(data).table('invitations')
    return invite
  }

  async deleteInvitation (data) {
    const invite = await knex.delete().table('invitations').where(data)
    return invite
  }

  async createContact (data) {
    const contact = await knex.insert(data).table('contacts')
    return contact
  }

  async showInvitations (id) {
    const invitations = await knex.select().table('invitations').where({invite_to: id})
    return invitations
  }
}

module.exports = new Chat()