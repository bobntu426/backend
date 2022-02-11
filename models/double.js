import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const doubleSchema = new Schema({
    player: {
        type: Array,
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
    id: {
        type: Number,
    },
    record: {
        type: [String],
    },
    rank: {
        type: Number,
    }
    
});


const Double = mongoose.model('double', doubleSchema);

export default Double;