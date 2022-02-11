import People from '../models/people'
import Event from '../models/event'
import Double from '../models/double'

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

