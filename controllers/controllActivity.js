import moment from 'moment-timezone'

import Subject from '../models/subject.model.js'
import Activity from '../models/activity.model.js'



export async function saveActivity(req, res) {
    try {
        const idSubject = req.params.id
        const { name, dateEntry, percent } = req.body
    
        const subjectFound = await Subject.findById(idSubject)

        const parsedDateEntry = new Date(dateEntry)

        //get the date creation of the activity
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

        const subjectSaveData = await newActivity.save()

        return res.status(200).json({
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


