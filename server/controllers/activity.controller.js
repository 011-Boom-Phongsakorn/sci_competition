import Activity from '../models/activity.model.js'

const activityController = {}

activityController.create = async (req, res) => {
    try{
        const {name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_phone, contact_email, status} = req.body

        if (!name || !description || !type || !level || !team_size || !date || !location || !reg_open || !reg_close || !contact_name || !contact_phone || !contact_email || !status) {
            return res.status(400).send({ message: 'can not empty'})
        }

        await Activity.findOne({ where: { name: name }}).then((activity) => {
            if(activity) {
                return res.stauts(400).send({ message: 'activity already existed!'})
            }

            const newActivity = { name, description, type, level, team_size, date, location, reg_open, reg_close, contact_name, contact_phone, contact_email, status }

            Activity.create(newActivity).then((data) => {
                res.send(data)
            }).catch((error) => {
                res.status(500).send({ message: error.message || 'Something error while creating the activity'})
            })
        })
    }catch(error){
        console.log("error while creating controller " + error)
        res.status(500).send({ message: error.message || 'Something error while creating the activity'})
    }
}

export default activityController