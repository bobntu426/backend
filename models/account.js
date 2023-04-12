import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const accountSchema = new Schema({
    name:{
        type: String
    },
    id: {
        type: Number,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
});


const Account = mongoose.model('account', peopleSchema);

export default Account;