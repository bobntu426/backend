import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const userSchema = new Schema({
    name:{
        type:String
    },
    id: {
        type: Number
    },
    password:{
        type:String
    }
    
});


const User = mongoose.model('administrator', userSchema);

export default User;