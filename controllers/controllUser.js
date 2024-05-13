import User from '../models/user.model.js'
import { genSalt, hash,compare } from 'bcrypt'
import auth from '../firebase/configFirabase.js'
import {createUserWithEmailAndPassword,} from 'firebase/auth'

// const auth = app.auth()

export async function getAllUsers(){
    try {
        const dataUsers = await User.find()
        return res.status(200).json({
            "status": true,
            "data": dataUsers
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}

export async function getUser() {
    try {
        const id = req.params.id
        const dataUser = await User.findById(id)
        return res.status(200).json({
            "status": true,
            "dataUser": dataUser
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}

export async function saveUser(req,res){
    try {

        const {name, lastname, email, carrier,password, phone} = req.body
        const userFound = await User.findOne({ email: email})
        
    

        if(!userFound) {
            const salt = await genSalt(15)
            const hashedPassword = await hash(password, salt)
            const registerFirabase = await createUserWithEmailAndPassword(auth,email, hashedPassword)
            const uidUser = registerFirabase.user.uid

            const newUser = new User({
                name,
                lastname,
                email,
                secrets: hashedPassword,
                carrier,
                phone,
                uid: uidUser 
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

export async function updateUser(req, res){
    try {
        const idUser = req.params.id
        const {name, lastname, email, carrier, phone} = req.body

        

        const updateUser = await User.findByIdAndUpdate(idUser, 
            {
                name: name,
                lastname: lastname,
                email: email,
                carrier: carrier,
                phone: phone
            },
          
            {new: true}
            )

        return res.status(200).json({
            "status": true,
            "message": 'Update user with successfully'
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error
        })
    }
}

export async function deleteUser(req, res){
    try {
        const id = req.params.id
        const userDeleted = await User.findByIdAndDelete(id)
        return res.status(200).json({
            "status": true,
            "message": 'User succcesfully deleted'
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
