import jwt from 'jsonwebtoken'
import auth from '../firebase/configFirabase.js'
import User from '../models/user.model.js'
import {signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth'
import { createAccessToken } from '../libs/jwt.js';



export async function loginUser(req, res) {
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({ email: email })

        if (!userFound) {
            return res.status(401).json({
                "status": false,
                "message": "Incorrect user or password"
            })
        }

        const loginFirebase = await signInWithEmailAndPassword(auth, email, password)

        if(!loginFirebase){
            return res.status(401).json({
                "status": false,
                "message": "Incorrect user or password"
            })
        }

        const payload = {
            id: userFound.id,
            uid: userFound.uid
        }

        const token = await createAccessToken(payload)

        return res.status(200).json({
            "status": true,
            token: token,
            "message": "Successful login"

        })

    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error.message
        })

    }
}

export async function verifySession(req, res){
    const token = req.header('Authorization')

    if (!token) return res.status(401).json({
        message: 'Not exist authorization'
    })

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({
            message: 'Not exist authorization'
        })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({
            message: 'Not exist authorization user'
        })

        
        return res.json({
            "message": "exist session"
        })
    })
}

export async function sendEmailRecovey(req, res){
    try {
        const {email} = req.body
        const recovery =  await sendPasswordResetEmail(auth, email);
    
        return res.status(200).json({
            "status": true,
            "message": "Password recovery email successfully sent",
        })
        
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error.message
        })
    }
}
