import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import {signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

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
            "error": error.message
        });
    }
}

export async function loginUser(req, res) {
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
        const loginFirebase = await signInWithEmailAndPassword(auth, email, password)

        const idToken = loginFirebase._tokenResponse.idToken

        return res.status(200).json({
            "status": true,
            "message": "Successful login",
            "token": idToken

        })

    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error.message
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
            "error": error.message
        })

    }
}
