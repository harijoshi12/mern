const HttpError = require('../models/http-error')
const {v4 : uuidv4} = require('uuid')
const { validationResult} = require('express-validator')

let DUMMY_PLACES = [
    {
        id:'p1',
        title:'Empire State Buildng',
        desc: 'best building of the world',
        location:{
            lat:40,
            lng:-73
        },
        address: 'usa',
        creator: 'u1'
    }
]

const getPlaceById = (req, res, next)=>{
    const placeid = req.params.pid
    const place = DUMMY_PLACES.find(p=>p.id === placeid)
    if(!place){
        // const err = new Error('no place id')
        // err.code = 404
        // throw err

        throw new HttpError('could not find a place id', 404)

    //    return res.status(404).json({message: "not found place"})
    }
    res.json({place})
}

const getPlacesByUserId = (req, res, next)=>{
    const userid = req.params.uid
    const places = DUMMY_PLACES.filter(p=>p.creator === userid)
    if(!places || places.length == 0){
        // const err = new Error('no place user id')
        // err.code = 404
        // return next(err)

        return next( new HttpError('could not find a places user id', 404) )

        // return res.status(404).json({message: "not found user"})
     }
    res.json({places})
}

const createPlace = (req, res, next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed', 422)
    }

    const {title, desc, cor, address, creator} = req.body
    // console.log(req.body);
    const createdPlace = {
        id: uuidv4(), title, desc, location: cor, address, creator
    }
    DUMMY_PLACES.push(createdPlace)
    res.status(201).json({place: createdPlace})
}

const updatePlace = (req, res, next) =>{
    const {title, desc} = req.body
    const placeId = req.params.pid
    const updatedPlace = {...DUMMY_PLACES.find(p=>p.id == placeId)} 
    const placeIndex = DUMMY_PLACES.findIndex(p=>p.id == placeId)
    updatedPlace.title = title
    updatedPlace.desc = desc

    DUMMY_PLACES[placeIndex] = updatedPlace
    res.status(200).json({place: updatedPlace})
}

const deletePlace = (req, res, next)=>{
    const placeId = req.params.pid
    DUMMY_PLACES= DUMMY_PLACES.filter(p=>p.id !== placeId)
    res.status(200).json({message: 'deleted place'})
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace