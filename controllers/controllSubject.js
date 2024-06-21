import Subject from '../models/subject.model.js'
import User from '../models/user.model.js'


export async function saveSubject(req, res) {
    try {
        const idUser = req.params.id;
        const { name, color } = req.body


        if (!name || !color) {
            return res.status(400).json({
                "status": false,
                "message": "Missing required parameters: 'name' and 'color'"
            })
        }

        const userFound = await User.findById(idUser)

        if (!userFound) {
            return res.status(404).json({
                "status": false,
                "message": "User not found"
            })
        }

        const newSubject = new Subject({
            name,
            color,
            user: idUser,
        })

        newSubject.userFound = idUser
        userFound.subjects.push(newSubject)
        await userFound.save()

        const subjectSaveData = await newSubject.save()

        return res.status(201).json({
            "status": true,
            "message": 'Subject saved successfully'
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error.message
        })
    }
}