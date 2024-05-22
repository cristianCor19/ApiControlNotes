import mongoose, {model} from "mongoose";

const {Schema} = mongoose

const activitySchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        dateEntry:{
            type: Date,
            required: true,
        },
        dateCreation:{
            type: Date,
            required: false,
        },
        percent:{
            type: Number,
            required: false,
        },
        qualification:{
            type: Number,
            required: false,
        },
        state:{
            type: String,
            enum: ['pending', 'progress', 'completed'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
)

export default model('Activity', activitySchema )