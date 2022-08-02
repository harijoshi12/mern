const {v4 : uuidv4} = require('uuid')
const HttpError = require('../models/http-error')

const DUMMY_USERS = [
    {
        id:'u1',
        name: "hari",
        email: "hari@hari.in",
        pwd: "123" 
    }
]

const getUsers = (req, res, next)=>{
    res.json({users: DUMMY_USERS})
}

const signup = (req, res, next)=>{
    const {name, email, pwd} = req.body

    const hasUser = DUMMY_USERS.find(u=>u.email === email)
    if(hasUser){
        throw new HttpError("user already exists", 422)
    }

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        pwd
    }

    DUMMY_USERS.push(createdUser)
    res.status(201).json({user: createdUser})
}

const login = (req, res, next)=>{
    const {email, pwd} = req.body

    const identifiedUser = DUMMY_USERS.find(u=>u.email === email)
    if(!identifiedUser || identifiedUser.pwd != pwd){
        throw new HttpError('could not identify user, credentials', 401)
    }
    res.json({message: "logged in"})
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login