import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
import activityRouter from './routers/activity.router.js'

app.use(express.json)
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.send("Hello, World 555")
})

app.use('/api/v1/activity', activityRouter)

app.listen(PORT, () => console.log(`Server is runnint on http://localhost:${PORT}`))