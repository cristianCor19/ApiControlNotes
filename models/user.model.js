import mongoose, {model} from "mongoose";

const {Schema} = mongoose

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        }, 
        carrier:{
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            unique: true,
            required: true,
        },
        secrets:{
           type: String,
           required: true, 
        }
        
    },
    {
        timestamps: true
    }
)

export default model('User', userSchema)