const Http_Error = require("../Models/http-error");
const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');
const getCoords = require('../util/location');

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
        creatorId: 1
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
        creatorId: 2
    }
];

const getplacesById = (req, res, next) => {
    const id = req.params.id;
    const place = DUMMY_PLACES.find(place => place.id === id);

    if (!place) {
        const error = new Http_Error('Could not find place with this id!', 404);
        return next(error);
    }

    res.json({ place });
};

const getPlacesbyUserId = (req, res, next) => {
    const id = req.params.id;
    const userPlaces = DUMMY_PLACES.filter(place => place.creatorId === Number(id));

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
    } catch (error) {
        return next(error);
    }

    const newPlace = {
        id: uuid(),
        title,
        description,
        coordinates: coords,
        address,
        creatorId
    };
    DUMMY_PLACES.push(newPlace);

    res.status(201).json({ place: newPlace });
};

const updatePlace = (req, res, next) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
        // console.log(validationError);
        throw new Http_Error('Validation error!', 422);
    }
    const { title, description } = req.body;
    const id = req.params.id;

    const updatedPlace = { ...DUMMY_PLACES.find(place => place.id === id) };
    const index = DUMMY_PLACES.findIndex(place => place.id === id);

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[index] = updatedPlace;

    res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
    const id = req.params.id;
    const indexDelete = DUMMY_PLACES.findIndex(place => place.id === id);

    DUMMY_PLACES.pop(indexDelete);

    res.status(200).json({ message: 'Place deleted!' });
}

exports.getPlacesbyUserId = getPlacesbyUserId;
exports.getplacesById = getplacesById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;