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
    const invitations = await knex.select().table('invitations').where({ invite_to: id })
    return invitations
  }

  async sendMessage(data){
    const msg = await knex.insert(data).table('chat')
    return msg
  }

  async setChatting (value, data) {
    const chatting = await knex.update({ chatting: value })
    .table('contacts')
    .whereRaw('user1 = ? and user2 = ? or user1 = ? and user2 = ?', [data.from_user, data.to_user, data.to_user, data.from_user])
    return chatting
  }

  async showContacts (id) {
    const contacts = await knex.select().table('contacts').whereRaw('user1 = ? or user2 = ?', [ id, id ])
    return contacts
  }
}

module.exports = new Chat()