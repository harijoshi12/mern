const express = require('express')
const bodyParser = require('body-parser')

const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error')
const app = express()

app.use(bodyParser.json())

app.use('/api/places',placesRoutes)
app.use('/api/users',usersRoutes)

app.use((req, res, next)=>{
    const err = new HttpError('could not find this route', 404)
    throw err
})

app.use((err, req, res, next)=>{
    if(res.headerSent){
        return next(err)
    }
    res.status(err.code || 500)
    res.json({message: err.message ||"unknown err"})
})

app.listen(5000)