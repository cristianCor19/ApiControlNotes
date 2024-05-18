import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'
import auth from '../firebase/configFirabase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser, sendPasswordResetEmail} from 'firebase/auth'
import { configAdminFirebase } from "../firebase/configFirabaseAdmin.js";

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
        const decodeToken = jwt.decode(req.params.token)
        const emailUser = decodeToken.email
        const dataUser = await User.findOne({ email: emailUser})

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

        const {name, lastname, email, carrier,password, phone} = req.body
        const userFound = await User.findOne({ email: email})
        
    

        if(!userFound) {
            const registerFirabase = await createUserWithEmailAndPassword(auth,email, password)
            const uidUser = registerFirabase.user.uid;
            const newUser = new User({
                name,
                lastname,
                email,
                carrier,
                phone,
                uid: uidUser,
            })

            const userSaveData = await newUser.save()

            return res.status(200).json({
                "status": true,
                "message": 'User saved successfully'
            })
        } else {
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

export async function updateUser(req, res) {
    try {
        const idUser = req.params.id
        const { name, lastname, email, carrier, phone } = req.body
        const updateUser = await User.findByIdAndUpdate(idUser,
            {
                name: name,
                lastname: lastname,
                email: email,
                carrier: carrier,
                phone: phone
            },

            { new: true }
        )

        const uidFirebase = updateUser.uid
        const deleteFirebase = await admin.auth().updateUser(uidFirebase, {
            email: email,
        })
        

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
        console.log('within deleteUser');
        const id = req.params.id
        
        const userDeleted = await User.findByIdAndDelete(id)
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
