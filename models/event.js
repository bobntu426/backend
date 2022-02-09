import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const eventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required.']
    },
    date: {
        type: Date,
    },
    location: {
        type: String,
    },
    host: {
        type: String,
    },
    info: {
        type: String,
    },
    id: {
        type: Number,
    },
    state: {
        type: String,
    },
    result: {
        type: Object,
    }
});


const Event = mongoose.model('event', eventSchema);

export default Event;