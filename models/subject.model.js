import mongoose, {model} from "mongoose";

const {Schema} = mongoose

const subjectSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        activities:[
            {
                type: Schema.Types.ObjectId,
                ref : 'Activity',
            }
        ],
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

export default model('Subject', subjectSchema )