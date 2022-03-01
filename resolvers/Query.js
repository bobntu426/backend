import People from '../models/people'
import Event from '../models/event'
import Double from '../models/double'
import School from '../models/school'
import Administrator from '../models/administrator'

const Query = {

  async getPeople(parent, {gender}, { db }, info) {
    let people = await People.find().limit(100).sort({score:-1})
    if(gender)
      people=people.filter((p)=>p.gender==gender)
    return people
  },
  async getRankSingleData(parent, {minimum,maximum,gender}, { db }, info) {
    const data = await People.find({ 
        $and: [ 
          { rank: { $gte: minimum } }, { rank: { $lte: maximum }},{gender:gender} 
        ]
      })
      .sort({score:-1})
    return data
  },
  async getRankDoubleData(parent, {minimum,maximum,gender}, { db }, info) {
    let data = await Double.find({ 
        $and: [ 
          { rank: { $gte: minimum } }, { rank: { $lte: maximum }},{gender:gender} 
        ]
      })
      .sort({score:-1})
    data=data.map(async(d)=>{
      let player = ['',''];
      [player[0]] = await People.find({id:d.player[0]});
      [player[1]] = await People.find({id:d.player[1]});
      d.player[0] = player[0]
      d.player[1] = player[1]
      return d
    })
    return data
  },
  async getPersonById(parent, {id}, { db }, info) {
    let person = null
    if(id){
      [person] = await People.find({id:id})
    }
    return person
  },
  async getCount(parent, {gender,type}, { db }, info) {
    let number = 0
    if(type=='single')
      number = await People.count({gender:gender})
    else if(type=='double')
      number = await Double.count({gender:gender})
    return number
  },
  async getEvent(parent, {state,name,schoolId,eventId}, { db }, info) {
    let event = await Event.find()
    if(state)
      event=event.filter((e)=>e.state==state)
    if(name)
      event=event.filter((e)=>e.name==name)
    if(schoolId)
      event = event.filter((s)=>s.schoolId==schoolId)
    if(eventId)
      event = event.filter((s)=>s.id==eventId)
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
  async getSchool(parent, {mustHasEvent,id}, { db }, info) {
    let school = await School.find()
    if(mustHasEvent)
      school=school.filter((s)=>s.eventName)
    if(id)
    school=school.filter((s)=>s.id==id)
    return school
  },
  async getSchoolNum(parent, {mustHasEvent}, { db }, info) {
    let schoolNum
    if(!mustHasEvent)
      schoolNum = await School.count()
    else
      schoolNum = await School.count({ eventName: { $exists: true } })
    return schoolNum
  },
  async getAdministratorById(parent, {id}, { db }, info) {
    const [administrator] = await Administrator.find({id:id})
    return administrator
  },
}

export default Query

