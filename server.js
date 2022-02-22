import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import cors from 'cors'
import express from 'express'
import People from './models/people'
import Event from './models/event'
import Double from './models/double'
import School from './models/school'
const pubsub = new PubSub()
const app = express()
app.use(cors())
dotenv.config()
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongo db connection created'))

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

const db = mongoose.connection

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Query,
    Mutation,
  },
  context: {
    db,
    pubsub,
  },
})

//const wss = new WebSocket.Server({ server })

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

//console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')
  const PORT = process.env.port || 4000
  server.start({ port: PORT }, async() => {
    const people = await People.find()
    const event = await Event.find()
    const double = await Double.find()
    const school = await School.find()
    console.log(`The server is up on port ${PORT}!`)
    if(people.length == 0){
      await People.insertMany([
        {name:'張峻林',score:2000,school:'台灣大學',id:1,popular:15,gender:'male',rank:1},
        {name:'張家翔',score:1950,school:'台灣大學',id:2,popular:15,gender:'male',rank:2},
        {name:'張育杰',score:1900,school:'輔仁大學',id:3,popular:15,gender:'male',rank:3},
        {name:'陳烱濤',score:1850,school:'台灣大學',id:4,popular:15,gender:'male',rank:4},
        {name:'任家良',score:1800,school:'慈濟大學',id:5,popular:15,gender:'male',rank:5},
        {name:'林恭緯',score:1750,school:'聯合大學',id:6,popular:15,gender:'male',rank:6},
        {name:'陳乃深',score:1700,school:'中原大學',id:7,popular:15,gender:'male',rank:7},
        {name:'李柏諺',score:1650,school:'台灣大學',id:8,popular:15,gender:'male',rank:8},
        {name:'葉昇翰',score:1600,school:'高雄科技大學',id:9,popular:15,gender:'male',rank:9},
        {name:'張友柏',score:1550,school:'逢甲大學',id:10,popular:15,gender:'male',rank:10},
        {name:'張霈承',score:1500,school:'中央大學',id:11,popular:15,gender:'male',rank:11},
        {name:'彭偉豪',score:1450,school:'台灣師範大學',id:12,popular:15,gender:'male',rank:12},
        {name:'陳睿恩',score:1400,school:'台灣大學',id:13,popular:15,gender:'male',rank:13},
        {name:'劉又嘉',score:1350,school:'台灣大學',id:14,popular:15,gender:'male',rank:14},
        {name:'許兆鈞',score:1300,school:'台灣大學',id:15,popular:15,gender:'male',rank:15},
        {name:'李書涵',score:1250,school:'輔仁大學',id:16,popular:15,gender:'male',rank:16},
        {name:'林育靖',score:1200,school:'台灣大學',id:17,popular:15,gender:'male',rank:17},
        {name:'何翊碩',score:1150,school:'輔仁大學',id:18,popular:15,gender:'male',rank:18},
        {name:'洪英傑',score:1100,school:'台灣大學',id:19,popular:15,gender:'male',rank:19},
        {name:'李英星',score:1050,school:'台北科技大學',id:20,popular:15,gender:'male',rank:20},
        {name:'巫家軒',score:1000,school:'交通大學',id:21,popular:15,gender:'male',rank:21},
        {name:'羅東祐',score:950,school:'逢甲大學',id:22,popular:15,gender:'male',rank:22},
        {name:'陳昱維',score:900,school:'陽交大學',id:23,popular:15,gender:'male',rank:23},
        {name:'邱冠翔',score:850,school:'陽交大學',id:24,popular:15,gender:'male',rank:24},
        {name:'趙奐凱',score:800,school:'台灣科技大學',id:25,popular:15,gender:'male',rank:25},
        {name:'李彥霆',score:750,school:'台灣科技大學',id:26,popular:15,gender:'male',rank:26},
        {name:'陳泓鈞',score:700,school:'台北大學',id:27,popular:15,gender:'male',rank:27},
        {name:'陳品州',score:650,school:'台北大學',id:28,popular:15,gender:'male',rank:28},
        {name:'張子賢',score:600,school:'台灣大學',id:29,popular:15,gender:'male',rank:39},
        {name:'林亮昕',score:550,school:'台灣大學',id:30,popular:15,gender:'male',rank:30},
        {name:'周芊妤',score:2000,school:'台灣大學',id:31,popular:15,gender:'female',rank:1},
        {name:'張沄芳',score:1900,school:'台灣大學',id:32,popular:15,gender:'female',rank:2},
        {name:'王昀中',score:1800,school:'台灣大學',id:33,popular:15,gender:'female',rank:3},
        {name:'林宜慧',score:1700,school:'海洋大學',id:34,popular:15,gender:'female',rank:4},
        {name:'盧奐妤',score:1600,school:'政治大學',id:35,popular:15,gender:'female',rank:5},
        {name:'鄭伃倢',score:1500,school:'政治大學',id:36,popular:15,gender:'female',rank:6},
        {name:'黃姝寧',score:1400,school:'輔仁大學',id:37,popular:15,gender:'female',rank:7},
        {name:'黃舒珩',score:1300,school:'輔仁大學',id:38,popular:15,gender:'female',rank:8},
        {name:'賀培瑄',score:1200,school:'長庚大學',id:39,popular:15,gender:'female',rank:9},
        {name:'廖珮妤',score:1100,school:'長庚大學',id:40,popular:15,gender:'female',rank:10},
        {name:'陳玠璇',score:1000,school:'逢甲大學',id:41,popular:15,gender:'female',rank:11},
        {name:'林佳葭',score:900,school:'逢甲大學',id:42,popular:15,gender:'female',rank:12},
        {name:'梁維珊',score:850,school:'台灣大學',id:43,popular:15,gender:'female',rank:13},
        {name:'朱家儀',score:800,school:'輔仁大學',id:44,popular:15,gender:'female',rank:14},
      ])
      console.log('init people')
    }
    if(double.length == 0){
      await Double.insertMany([
        {player:[23,24],score:900,school:'陽交大學',id:1,gender:'male',rank:1},
        {player:[25,26],score:800,school:'台灣科技大學',id:2,gender:'male',rank:2}, 
        {player:[27,28],score:700,school:'台北大學',id:3,gender:'male',rank:3},
        {player:[29,30],score:600,school:'台灣大學',id:4,gender:'male',rank:4},
        {player:[35,36],score:1600,school:'政治大學',id:5,gender:'female',rank:1},
        {player:[37,38],score:1400,school:'輔仁大學',id:6,gender:'female',rank:2},
        {player:[39,40],score:1200,school:'長庚大學',id:7,gender:'female',rank:3},
        {player:[41,42],score:1000,school:'逢甲大學',id:8,gender:'female',rank:4},
        {player:[1,43],score:1200,school:'輔仁大學',id:9,gender:'mix',rank:1},
        {player:[3,44],score:1000,school:'台灣大學',id:10,gender:'mix',rank:2}
      ])
      console.log('init double')
    }
    if(school.length == 0){
      await School.insertMany([
        {name:'臺灣大學',id:1},
        {name:'陽交大學',id:3,eventName:'交大盃'},
        {name:'輔仁大學',id:1,eventName:'輔大盃'},
        {name:'中興大學',id:5,eventName:'興大盃'},
        {name:'臺北商業大學',id:9,eventName:'北商盃'},
        {name:'台灣師範大學',id:4,eventName:'師大盃'},
        {name:'成功大學',id:8,eventName:'成大盃'},
        {name:'靜宜大學',id:6,eventName:'靜宜盃'},
        {name:'淡江大學',id:2,eventName:'淡大盃'},
        {name:'虎尾科技大學',id:10,eventName:'虎科盃'},
      ])
      console.log('init school')
    }
    if(event.length == 0){
      await Event.insertMany([
        {name: "輔大盃", date: new Date(), location: "板樹體育館", host: "輔仁大學", info: "", id: 1, state: "coming",age:20,schoolId:1}, 
        {name: "淡大盃", date: new Date(), location: "淡江大學", host: "淡江大學", info: "", id: 2, state: "coming",age:12,schoolId:2},
        {name: "輔大盃", date: new Date(), location: "泰山體育館", host: "輔仁大學", info: "", id: 3, state: "finish",age:19,schoolId:1}, 
        {name: "淡大盃", date: new Date(), location: "淡江大學", host: "淡江大學", info: "", id: 4, state: "finish",age:11,schoolId:2},
        {name: "交大盃", date: new Date(), location: "陽交大學", host: "陽交大學", info: "", id: 5, state: "finish",age:1,schoolId:3},
        {name: "師大盃", date: new Date(), location: "師範大學", host: "師範大學", info: "", id: 6, state: "finish",age:1,schoolId:4},
        {name: "興大盃", date: new Date(), location: "中興大學", host: "中興大學", info: "", id: 7, state: "finish",age:1,schoolId:5},
        {name: "靜宜盃", date: new Date(), location: "靜宜大學", host: "靜宜大學", info: "", id: 8, state: "finish",age:1,schoolId:6},
        {name: "家翔盃", date: new Date(), location: "家翔大學", host: "家翔大學", info: "", id: 9, state: "live",age:1,schoolId:7},
        {name: "成大盃", date: new Date(), location: "成功大學", host: "成功大學", info: "", id: 10, state: "finish",age:1,schoolId:8},
        {name: "虎科盃", date: new Date(), location: "虎尾科技大學", host: "虎尾科技大學", info: "", id: 12, state: "finish",age:1,schoolId:10},
        {
          name: "北商盃", date: new Date(), location: "台北商業大學", host: "台北商業大學", info: "", id: 11, state: "finish",schoolId:9,
          result:{
            manGroup:{
              first:'陽明交通大學紅',
              second:'高雄科技大學',
              third:['台灣大學A','台灣科技大學A']
            },
            womanGroup:{
              first:'台灣大學A',
              second:'陽明交通大學紅',
              third:['逢甲大學','台北科大']
            },
            manSingle:{
              first:1,
              second:6,
              third:[9,22]
            },
            womanSingle:{
              first:31,
              second:32,
              third:[33,34]
            },
            manDouble:{
              first:1,
              second:2,
              third:[3,4]
            },
            womanDouble:{
              first:1,
              second:2,
              third:[3,4]
            },
          }
        },
      ])
      console.log('init event')
    }
  })
})
