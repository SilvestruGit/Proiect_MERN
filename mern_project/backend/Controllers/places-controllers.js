const Http_Error = require("../Models/http-error");
const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');
const getCoords = require('../util/location');
const Place = require('../Models/place');
const {MongoClient} = require('mongodb');
const uri = require('../uri');

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: "u1"
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        coordinates: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: "u2"
    }
];

const getplacesById = async (req, res, next) => {
    const id = req.params.id;
    //const place = DUMMY_PLACES.find(place => place.id === id);
    let place;
    try {
        place = await Place.findById(id).exec();
    } catch (error) {
        console.log(error);
    }


    if (!place) {
        const error = new Http_Error('Could not find place with this id!', 404);
        return next(error);
    }

    res.json({ place });
};

const getPlacesbyUserId = async (req, res, next) => {
    const id = req.params.id;
    //const userPlaces = DUMMY_PLACES.filter(place => place.creatorId === Number(id));

    const client = new MongoClient(uri);
    let userPlaces;
    try {
        await client.connect();
        const db = client.db('places');
        userPlaces = await db.collection('places').find().toArray();
        userPlaces = userPlaces.filter(place => place.creatorId === id);
    } catch (error) {
        return next(error);
    } finally {
        client.close();
    }

    if (!userPlaces[0]) {
        const error = new Http_Error('Could not find place with this user id!', 404);
        return next(error);
    }

    res.json(userPlaces);
};

const createPlace = async (req, res, next) => {

    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        // console.log(validationError);
        next(new Http_Error('Validation error!', 422));
    }

    const { title, description, address, creatorId } = req.body;

    let coords;
    try {
        coords = await getCoords(address);
        // console.log(coords);
    } catch (error) {
        return next(error);
    }

    const newPlace = new Place({
        title,
        description,
        address,
        coordinates: coords,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        creatorId
    });

    try {
        await newPlace.save();
    } catch (error) {
        const err = new Http_Error(
            'Creating a place failed!',
            500
        );
        return next(err);
    }


    res.status(201).json({ place: newPlace });
};

const updatePlace = async (req, res, next) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        // console.log(validationError);
        throw new Http_Error('Validation error!', 422);
    }
    const { title, description } = req.body;
    const id = { _id: req.params.id };
    let updatedPlace;

    try {
        const update = { title, description };
        updatedPlace = await Place.findOneAndUpdate(id, update);
    } catch (error) {
        return next(error);
    }

    res.status(200).json({ place: updatedPlace });
};

const deletePlace = async (req, res, next) => {
    const id = req.params.id;
    //const indexDelete = DUMMY_PLACES.findIndex(place => place.id === id);
    //DUMMY_PLACES.pop(indexDelete);

    try {
        await Place.deleteOne({ _id: id});
    } catch (error) {
        return next(error);
    }

    res.status(200).json({ message: 'Place deleted!' });
}

exports.getPlacesbyUserId = getPlacesbyUserId;
exports.getplacesById = getplacesById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;