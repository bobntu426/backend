import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const contestSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required.']
    },
    score: {
        type: Number,
    },
    gender: {
        type: String,
    },
    school: {
        type: String,
    },
    playType: {
        type: String,
    },
    hand: {
        type: String,
    },
    age: {
        type: String,
    },
    id: {
        type: Number,
    },
    record: {
        type: [String],
    }
    
});


const Contest = mongoose.model('contest', contestSchema);

export default Contest;