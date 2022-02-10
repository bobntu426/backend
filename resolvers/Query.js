import People from '../models/people'
import Event from '../models/event'

const Query = {

  async getPeople(parent, {gender}, { db }, info) {
    let people = await People.find().limit(100).sort({score:-1})
    if(gender)
      people=people.filter((p)=>p.gender==gender)
    return people
  },
  async getTwentyPeople(parent, {minimum,maximum,gender}, { db }, info) {
    let people
    if(gender)
      people = await People.find({ 
        $and: [ 
          { rank: { $gte: minimum } }, { rank: { $lte: maximum }},{gender:gender} 
        ]
      })
      .sort({score:-1})
    else
      people = await People.find({ 
        $and: [ 
          { rank: { $gte: minimum } }, { rank: { $lte: maximum } }
        ]
      }).sort({score:-1})
      
    return people
  },
  async getPersonById(parent, {id}, { db }, info) {
    let person = null
    
    if(id){
      [person] = await People.find({id:id})
    }
    return person
  },
  async getPeopleNum(parent, {gender}, { db }, info) {
    let peopleNum = 0
    if(gender)
      peopleNum = await People.count({gender:gender})
    else
      peopleNum = await People.count()
    return peopleNum
  },
  async getEvent(parent, {state}, { db }, info) {
    let event = await Event.find()
    if(state)
      event=event.filter((e)=>e.state==state)
    return event
  },
  async getEventNum(parent, {state}, { db }, info) {
    let eventNum
    if(state)
      eventNum = await Event.count({state:state})
    else
      eventNum = await Event.count()
    return eventNum
  },
  
}

export default Query

