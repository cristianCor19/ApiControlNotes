import User from '../models/user.model.js'
import { genSalt, hash,compare } from 'bcrypt'


export async function saveUser(req,res){
    try {
        const {name, lastname, email, carrier,password, phone} = req.body

        const userFound = await User.findOne({ email: email})


        if(!userFound) {
            const salt = await genSalt(15)
            const hashedPassword = await hash(password, salt)
            
            const newUser = new User({
                name,
                lastname,
                email,
                secrets: hashedPassword,
                carrier,
                phone,
            })

            const userSaveData = await newUser.save()

            return res.status(200).json({
                "status": true,
                "message": 'User saved successfully'
            })
        }else{
            return res.status(500).json({
                "status": false,
                "error": error,
                "message": "Mail alredy registered"
            })
        }
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}