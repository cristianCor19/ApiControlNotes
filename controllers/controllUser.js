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
        
    

        if (!userFound) {
            const salt = await genSalt(15)
            const hashedPassword = await hash(password, salt)
            const registerFirabase = await createUserWithEmailAndPassword(auth,email, hashedPassword)
            const uidUser = registerFirabase.user.uid;
            const newUser = new User({
                name,
                lastname,
                email,
                secrets: hashedPassword,
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

export async function verifySession(req, res) {
    console.log('verifySession');
    try {
        const decodeToken = jwt.decode(req.params.token)
        const emailUser = decodeToken.email
        // console.log(decodeToken);
        onAuthStateChanged(auth, () => {
            
            if (emailUser) {
                return res.status(200).json({
                    "status": true,
                    "message": "Exist session",
                    "user": emailUser,
                });
            } else {
                return res.status(401).json({
                    "status": false,
                    "message": "No session exists"
                });
            }
        });
        
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        });
    }
}

export async function loginUser(req, res) {
    console.log('loginUser');
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({ email: email })

        if (!userFound) {
            return res.status(404).json({
                "status": false,
                "message": "Incorrect user or password"
            })
        }
        //sing in user to firebase authentication
        const loginFirebase = await signInWithEmailAndPassword(auth, email, userFound.secrets)

        // console.log(loginFirebase);
        const idToken = loginFirebase._tokenResponse.idToken


        const passwordMatch = await compare(password, userFound.secrets)


        if (!passwordMatch) {
            return res.status(401).json({
                "status": false,
                "message": "Incorrect user or password"
            })
        }

        return res.status(200).json({
            "status": true,
            "message": "Successful login",
            "token": idToken

        })

    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })

    }
}

export async function signOutUser(req, res) {
    try {
        await signOut(auth)

        return res.status(200).json({
            "status": true,
            "message": "Successful sign out",
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })

    }
}

export async function sendEmailRecovey(req, res){
    try {
        const email = 'cordobac96@gmail.com'
          await sendPasswordResetEmail(auth, email);
    
        return res.status(200).json({
            "status": true,
            "message": "Send email successfully",
        })
        
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
