import User from '../models/user.model.js'
import auth from '../firebase/configFirabase.js'
import { createUserWithEmailAndPassword, } from 'firebase/auth'
import { configAdminFirebase } from "../firebase/configFirabaseAdmin.js";
import { createAccessToken } from '../libs/jwt.js';



import admin from 'firebase-admin'
admin.initializeApp({
    credential: admin.credential.cert(configAdminFirebase)
})

export async function getAllUsers() {
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

export async function getProfileUser(req, res) {
    try {
        const userId = req.user.id;

        const dataUser = await User.findById(userId)
        
        if(!dataUser) {
            return res.status(404).json({
                "status": false,
                "message": "Not exist user"
            })
        }

        return res.status(200).json({
            status: true,
            message: "User found successfully",
            data: {
                _id: dataUser._id,
                name: dataUser.name,
                lastname: dataUser.lastname,
                email: dataUser.email,
                carrier: dataUser.carrier,
                phone: dataUser.phone,
                uid: dataUser.uid
            }
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}

export async function saveUser(req, res) {
    try {
        console.log('arrive');
        
        const {name, lastname, email, carrier,password, confirmPassword} = req.body

        if(password !== confirmPassword) {
            return res.status(400).json({
                "status": false,
                "message": "Passwords do not match"
            })
        }
        
        const userFound = await User.findOne({ email: email})
        
        if(!userFound) {
            const registerFirabase = await createUserWithEmailAndPassword(auth,email, password)
            const uidUser = registerFirabase.user.uid;
            const newUser = new User({
                email,
                uid: uidUser,
            })

            const userSave = await newUser.save()

            const payload = {
                id: userSave.id,
                uid: userSave.uid
              };
            
            const token = await createAccessToken(payload)
            

            return res.status(200).json({
                "status": true,
                token: token,
                "message": 'User saved successfully'
            })
        } else {
            return res.status(409).json({
                "status": false,
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

export async function updateUser(req, res) {
    try {
        const userId = req.user.id;
        const { name, lastname, carrier, phone } = req.body
        const updateUser = await User.findByIdAndUpdate(userId,
            {
                name: name,
                lastname: lastname,
                carrier: carrier,
                phone: phone
            },

            { new: true }
        )

        // const uidFirebase = updateUser.uid
        // const updateEmailFirebase = await admin.auth().updateUser(uidFirebase, {
        //     email: email,
        // })
        

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

export async function deleteUserGeneral(req, res) {
    try {
        const idUser = req.user.id
        const userDeleted = await User.findByIdAndDelete(idUser)
        const uidFirebase = userDeleted.uid
        const deleteFirebase = await admin.auth().deleteUser(uidFirebase)

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
