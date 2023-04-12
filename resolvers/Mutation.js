import People from '../models/people'
import Event from '../models/event'
import bcrypt from 'bcryptjs'
import Double from '../models/double'
import School from '../models/school'
import Administrator from '../models/administrator'
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
  },
  async deleteAllSchool(parent, args, { db, pubsub }, info) {
    try{
      await School.deleteMany({})
    }catch{}
    return 'all school has been deleted'
  },
  
  async checkPassword(parent, {name,password}, { db, pubsub }, info) {
    const [user] = await Administrator.find({ name: name })
    if (!user) {
      return {success:false,name:name}
    }
    return {success:bcrypt.compareSync(password, user.password),name:name}
  },
  async createPerson(parent, {name,schoolId,gender,hand,playType,birthday}, { db }, info) {
    const peopleNum = await People.count()
    const [school] = await School.find({id:schoolId})
    try{
      await People.insertMany({
        name:name,
        score:0,
        schoolId:schoolId,
        school:school.name,
        gender:gender,
        id:peopleNum+1,
        hand:hand,
        playType:playType,
        birthday:new Date(birthday),
        rank:0,
        popular:0
      })
    }catch{}
    return 'create person success'
  },
}

export default Mutation
