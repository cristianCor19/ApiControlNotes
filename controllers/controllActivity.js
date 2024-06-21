import moment from 'moment-timezone'

import Subject from '../models/subject.model.js'
import Activity from '../models/activity.model.js'



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

        const parsedDateEntry = new Date(dateEntry)
    
        const currentDate =  moment.tz('America/Bogota').format()
        const newActivity = new Activity({
            name,
            dateEntry: parsedDateEntry,
            percent,
            dateCreation: currentDate
        })


        //save activity in subject
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
            "error": error.message,
            "message": "Error saving activity"
        })
    }
}


