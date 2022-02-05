import People from '../models/people'
const Query = {
  async getAllPeople(parent, args, { db }, info) {
    const people = await People.find().sort({score:-1})
    return people
  }
}
export default Query

