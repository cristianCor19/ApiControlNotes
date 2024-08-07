import moment from 'moment-timezone'
import Subject from '../models/subject.model.js'
import Activity from '../models/activity.model.js'


export async function getActivitys(req,res){
    try {
        const idSubject = req.params.id;
        const state = req.params.state;
        const dataActivitys = await Activity.find({subject: idSubject, state: state})
        return res.status(200).json({
            "status": true,
            data: dataActivitys,  
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error.message
        })
    }
}

export async function getActivitysSubject(req,res){
    try {
        const idSubject = req.params.id;
        const dataActivitys = await Activity.find({subject: idSubject})
        return res.status(200).json({
            "status": true,
            data: dataActivitys,  
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error.message
        })
    }
}

export async function getActivitysUser(req,res){
    try {
        const idUser = req.params.id;
        const state = req.params.state;
        const dataActivitys = await Activity.find({idUser: idUser, state: state})
        return res.status(200).json({
            "status": true,
            data: dataActivitys,  
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error.message
        })
    }
}

export async function getActivitysToIdUser(req,res){
    try {
        const idUser = req.params.id;
        console.log(idUser);
        const dataActivitys = await Activity.find({idUser: idUser})
        return res.status(200).json({
            "status": true,
            data: dataActivitys,  
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error.message
        })
    }
}

export async function getActivity(req, res){
    try {
        const idActivity = req.params.id;
        console.log(idActivity);
        const dataActivity = await Activity.findById(idActivity)
        if(!dataActivity) {
            return res.status(404).json({
                "status": false,
                "message": "Not exist Activity"
            })
        }

        return res.status(200).json({
            status: true,
            message: "Activity found successfully",
            data: {
                _id: dataActivity._id,
                name: dataActivity.name,
                dateEntry: dataActivity.dateEntry,
                dateCreation: dataActivity.dateCreation,
                percent: dataActivity.percent,
                qualification: dataActivity.qualification,
                state: dataActivity.state
            }
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error.message
        })
    }
}

export async function saveActivity(req, res) {
    try {
        const idSubject = req.params.id
        const { name, dateEntry, percent } = req.body
       
        if(!name || !dateEntry || !percent){
            return res.status(400).json({
                "status": "false",
                "message": "Missing required parameters: name, dateEntry, percent and percent"
            })
        }
    
        const subjectFound = await Subject.findById(idSubject)
        if(!subjectFound) {
            return res.status(404).json({
                "status": "false",
                "message": "Not Found subject"
            })
        }

        const idUser = subjectFound.user;
        

        const parsedDateEntry = new Date(dateEntry)
    
        const currentDate =  moment.tz('America/Bogota').format()
        const newActivity = new Activity({
            name,
            dateEntry: parsedDateEntry,
            percent,
            dateCreation: currentDate,
            subject: idSubject,
            idUser: idUser,
        })

        newActivity.subjectFound = idSubject
        subjectFound.activities.push(newActivity)
        await subjectFound.save()
        

        const activitySaveData = await newActivity.save()

        return res.status(201).json({
            "status": true,
            "message": 'Activity saved successfully'
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error.message
        })
    }
}

export async function updateActivity(req, res) {
    try {
        const idActivity = req.params.id;
        const { name, percent, qualification, state, dateEntry } = req.body
        const updateActivity = await Activity.findByIdAndUpdate(idActivity,
            {
                name: name,
                percent: percent,
                qualification: qualification,
                state: state,
                dateEntry: dateEntry
            },

            { new: true }
        )
        
        return res.status(200).json({
            "status": true,
            "message": 'Update activity with successfully'
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error
        })
    }
}

export async function deleteActivity(req, res) {
    try {
        const idActivity = req.params.id
        const activityDeleted = await Activity.findByIdAndDelete(idActivity)
        if(!activityDeleted){
            return res.status(404).json({
                "status": "false",
                "message": "Activity not found"
            })
        }

        const idSubject = activityDeleted.subject
        const subjectFound = await Subject.findById(idSubject)
        if(!subjectFound){
            return res.status(404).json({
                "status": "false",
                "message": "Subject not found"
            })
        }
       

        subjectFound.activities = subjectFound.activities.filter(
            activity => activity.toString() !== idActivity
        )
        await subjectFound.save()
        

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

