import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'
import auth from '../firebase/configFirabase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'



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

export async function deleteUser(req, res) {
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
