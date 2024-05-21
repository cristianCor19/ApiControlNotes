import Subject from '../models/subject.model.js'
import User from '../models/user.model.js'


export async function saveSubject(req, res) {
    try {
        const idUser = req.params.id
        const { name, code } = req.body
       
        const userFound = await User.findById(idUser)

        const newSubject = new Subject({
            name,
            code,
            user: idUser,
        })

        newSubject.userFound = idUser
        userFound.subjects.push(newSubject)
        await userFound.save()

        const subjectSaveData = await newSubject.save()

        return res.status(200).json({
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