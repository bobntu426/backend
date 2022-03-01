import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const schoolSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required.']
    },
    eventName:{
        type:String
    },
    id: {
        type: Number,
    },
    record: {
        type: [String],
    },
    accountId:{
        type: Number
    }
});


const School = mongoose.model('school', schoolSchema);

export default School;