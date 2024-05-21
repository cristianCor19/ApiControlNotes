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
            required: false,
        },
        phone: {
            type: Number,
            required: false,
        },
        uid:{
            type: String,
            required: true,
            unique: true
        },
        subjects:[
            {
                type: Schema.Types.ObjectId,
                ref : 'Subject'
            }
        ]
        
    },
    {
        timestamps: true
    }
)

export default model('User', userSchema)