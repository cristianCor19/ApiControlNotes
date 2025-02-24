import jwt from 'jsonwebtoken'
import auth from '../firebase/configFirabase.js'
import User from '../models/user.model.js'
import { signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset, GoogleAuthProvider, signInWithPopup,getAuth } from 'firebase/auth'
import { createAccessToken } from '../auth/jwt.js';
import { createOrUpdateUser } from '../service/auth.service.js';




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

        if (!loginFirebase) {
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

export async function loginUserGoogle(req, res) {
    try {
        const { email, uid, displayName } = req.body;

        const token = await createOrUpdateUser(email, uid, displayName, 'google');

        return res.status(200).json({
            status: true,
            token: token,
            message: "successful login"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        });
    }
}

export async function verifySession(req, res) {
    const authHeader = req.header('Authorization')


    if (!authHeader) return res.status(401).json({
        message: 'Not exist authorization'
    })

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            "message": "Invalid authorization format. Must use Bearer scheme"
        })
    }

    const token = authHeader.slice(7);

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({
            message: 'Not exist authorization'
        })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({
            message: 'Not exist authorization user'
        })


        return res.json({
            "message": "exist session",
            "data": {
                id: userFound._id,
                name: userFound.name,
                lastname: userFound.lastname,
                email: userFound.email
            }
        })
    })
}

export async function sendEmailRecovey(req, res) {
    try {
        const { email } = req.body

        const userFound = await User.findOne({ email: email })

        if (!userFound) {
            return res.status(404).json({
                "status": false,
                "message": "User not found"
            });
        }


        const recovery = await sendPasswordResetEmail(auth, email,
        );



        return res.status(200).json({
            "status": true,
            "email": userFound.email,
            "message": "Password recovery email successfully sent",
        })

    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error.message
        })
    }
}

export async function resetPasswordRecovey(req, res) {
    try {
        const { oobCode, password, confirmPassword } = req.body;


        if (password !== confirmPassword) {
            return res.status(400).json({
                "status": false,
                "message": "The password is not the same"
            });
        }


        const answer = await confirmPasswordReset(auth, oobCode, password);

        return res.status(200).json({
            "status": true,
            "message": "password reset successfully"
        });


    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error.message
        });

    }
}
