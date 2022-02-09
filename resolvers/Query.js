import People from '../models/people'
const Query = {
  async getAllPeople(parent, args, { db }, info) {
    const people = await People.find().limit(100).sort({score:-1})
    return people
  },
  async getTwentyPeople(parent, {minimum,maximum}, { db }, info) {
    const people = await People.find({ 
      $and: [ 
        { rank: { $gte: minimum } }, { rank: { $lte: maximum } }
      ] 
    })
    .sort({score:-1})
    return people
  },
  async getOnePerson(parent, {id}, { db }, info) {
    let person = null
    
    if(id){
      [person] = await People.find({id:id})
    }
    return person
  },
  async getAllPeopleNum(parent, args, { db }, info) {
    const peopleNum = await People.count()
    return peopleNum
  },
  
}

export default Query

