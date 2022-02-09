import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import cors from 'cors'
import express from 'express'
import People from './models/people'
import Event from './models/event'
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
    console.log(`The server is up on port ${PORT}!`)
    if(people.length == 0){
      await People.insertMany([
        {name:'張峻林',score:2000,school:'台灣大學',id:1,popular:15,gender:'male',rank:1},
        {name:'張家翔',score:1900,school:'台灣大學',id:2,popular:15,gender:'male',rank:2},
        {name:'張育杰',score:1800,school:'輔仁大學',id:3,popular:15,gender:'male',rank:4},
        {name:'陳烱濤',score:1700,school:'台灣大學',id:4,popular:15,gender:'male',rank:5},
        {name:'任家良',score:1600,school:'慈濟大學',id:5,popular:15,gender:'male',rank:6},
        {name:'林恭緯',score:1500,school:'聯合大學',id:6,popular:15,gender:'male',rank:7},
        {name:'陳乃深',score:1400,school:'中原大學',id:7,popular:15,gender:'male',rank:8},
        {name:'李柏諺',score:1300,school:'台灣大學',id:8,popular:15,gender:'male',rank:9},
        {name:'葉昇翰',score:1200,school:'高雄科技大學',id:9,popular:15,gender:'male',rank:10},
        {name:'張友柏',score:1100,school:'逢甲大學',id:10,popular:15,gender:'male',rank:11},
        {name:'張霈承',score:1000,school:'中央大學',id:11,popular:15,gender:'male',rank:12},
        {name:'彭偉豪',score:900,school:'台灣師範大學',id:12,popular:15,gender:'male',rank:13},
        {name:'陳睿恩',score:800,school:'台灣大學',id:13,popular:15,gender:'male',rank:14},
        {name:'劉又嘉',score:700,school:'台灣大學',id:14,popular:15,gender:'male',rank:15},
        {name:'許兆鈞',score:600,school:'台灣大學',id:15,popular:15,gender:'male',rank:16},
        {name:'李書涵',score:500,school:'輔仁大學',id:16,popular:15,gender:'male',rank:17},
        {name:'林育靖',score:400,school:'台灣大學',id:17,popular:15,gender:'male',rank:18},
        {name:'何翊碩',score:300,school:'輔仁大學',id:18,popular:15,gender:'male',rank:19},
        {name:'洪英傑',score:200,school:'台灣大學',id:19,popular:15,gender:'male',rank:20},
        {name:'李英星',score:100,school:'台北科技大學',id:20,popular:15,gender:'male',rank:21},
        {name:'巫家軒',score:1850,school:'交通大學',id:21,popular:15,gender:'male',rank:3},
      ])
      console.log('init people')
    }
    if(event.length == 0){
      await Event.insertMany([
        {name: "輔大盃", date: new Date(), location: "泰山體育館", host: "輔仁大學", info: "", id: 1, state: false}, 
        {name: "淡大盃", date: new Date(), location: "淡江大學", host: "淡江大學", info: "", id: 2, state: false}
      ])
      console.log('init event')
    }
  })
})
