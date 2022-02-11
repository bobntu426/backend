import People from '../models/people'
import Event from '../models/event'
import bcrypt from 'bcryptjs'
import Double from '../models/double'
const Mutation = {
  async deleteAllPeople(parent, args, { db, pubsub }, info) {
    try{
      await People.deleteMany({})
    }catch{}
    return 'all people has been deleted'
  },
  async deleteAllEvent(parent, args, { db, pubsub }, info) {
    try{
      await Event.deleteMany({})
    }catch{}
    return 'all event has been deleted'
  },
  async deleteAllDouble(parent, args, { db, pubsub }, info) {
    try{
      await Double.deleteMany({})
    }catch{}
    return 'all double has been deleted'
  }
}

export default Mutation
