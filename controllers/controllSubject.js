import Subject from '../models/subject.model.js'
import User from '../models/user.model.js'
import Activity from '../models/activity.model.js'

export async function getSubjects(req,res){
    try {
        const idUser = req.params.id;
        const dataSubjects = await Subject.find({user: idUser})
        return res.status(200).json({
            "status": true,
            data: dataSubjects,  
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error.message
        })
    }
}

export async function getSubject(req, res){
    try {
        const idSubject = req.params.id;
        const dataSubject = await Subject.findById(idSubject)
        if(!dataSubject) {
            return res.status(404).json({
                "status": false,
                "message": "Not exist subject"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Subject found successfully",
            data: {
                _id: dataSubject._id,
                name: dataSubject.name,
                color: dataSubject.color,
                activities: dataSubject.activities

            }
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error.message
        })
    }
}


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

export async function updateSubject(req, res) {
    try {
        const idSubject = req.params.id;
        const { name, color } = req.body
        const updateSubject = await Subject.findByIdAndUpdate(idSubject,
            {
                name: name,
                color: color,
            },

            { new: true }
        )
        
        return res.status(200).json({
            "status": true,
            "message": 'Update subject with successfully'
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error
        })
    }
}


export async function deleteSubject(req, res) {
    try {
        const idSubject = req.params.id
        
        const subjectDeleted = await Subject.findByIdAndDelete(idSubject)
        if(!subjectDeleted){
            return res.status(404).json({
                "status": "false",
                "message": "Subject not found"
            })
        }

        const activitysDelete = await Activity.deleteMany({subject: idSubject});

        const idUser = subjectDeleted.user
        const userFound = await User.findById(idUser)
        if(!userFound){
            return res.status(404).json({
                "status": "false",
                "message": "User not found"
            })
        }
       

        userFound.subjects = userFound.subjects.filter(
            subject => subject.toString() !== idSubject
        )
        await userFound.save()
        

        return res.status(200).json({
            "status": true,
            "message": 'Subject succcesfully deleted'
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}