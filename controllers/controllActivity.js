import moment from 'moment-timezone'
import Subject from '../models/subject.model.js'
import Activity from '../models/activity.model.js'

export async function getActivitiesSubjectByState(req,res){
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
        const idUser = req.user.id;
        const state = req.query.state;
       

        let filter = {idUser: idUser};
        if(state && state !=="all"){
            filter.state = state;
        } 
        
        const dataActivitys = await Activity.find(filter)

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

export async function getActivityById(req, res){
    try {
        const idActivity = req.params.id;
        console.log("arrive by id");
        const dataActivity = await Activity.findById(idActivity)
        if(!dataActivity) {
            return res.status(404).json({
                "status": false,
                "message": "Not exist Activity"
            })
        }

        console.log(dataActivity);
        

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
     
        const { name, date, percentage, subject } = req.body
        
       
        if(!name || !date || !percentage){
            return res.status(400).json({
                "status": "false",
                "message": "Missing required parameters: name, dateEntry, percent and percent"
            })
        }
    
        const subjectFound = await Subject.findById(subject)
        if(!subjectFound) {
            return res.status(404).json({
                "status": "false",
                "message": "Not Found subject"
            })
        }

        const idUser = subjectFound.user;
        

        const parsedDateEntry = new Date(date)
    
        const currentDate =  moment.tz('America/Bogota').format()
        const newActivity = new Activity({
            name,
            dateEntry: parsedDateEntry,
            percent: percentage,
            dateCreation: currentDate,
            subject: subject,
            nameSubject: subjectFound.name,
            idUser: idUser,
        })

        newActivity.subjectFound = subject
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
        // const idActivity = req.params.id;
        console.log("llego");
        
        const { name, percent, qualification, state, _id } = req.body
        console.log(_id);
        
        const updateActivity = await Activity.findByIdAndUpdate(_id,
            {
                name: name,
                percent: percent,
                qualification: qualification,
                state: state,
                // dateEntry: dateEntry
            },

            { new: true }
        )
        
        console.log(updateActivity);
        
        return res.status(200).json({
            "status": true,
            "message": 'Update activity with successfully'
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "message": error.message
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

export async function totalActivities(req, res){
    try {
        const userId = req.user.id;

        const activity = await Activity.find({idUser: userId})

        const statusActivity = activity.reduce((amount, {state}) => {
            amount[state] = (amount[state] || 0) +(1)
            return amount; 
        },{})
        
        
        return res.status(200).json({
            "status": true,
            "data": statusActivity
        })

    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error.message
        })
    }
}

