const Http_Error = require("../Models/http-error");
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const getCoords = require('../util/location');
const Place = require('../Models/place');
const { MongoClient } = require('mongodb');
const uri = require('../uri');
const User = require('../Models/user');

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

    const client = new MongoClient(uri);
    let userPlaces;
    try {
        await client.connect();
        const db = client.db('mern');
        userPlaces = await db.collection('places').find().toArray();
        userPlaces = userPlaces.filter(place => place.creatorId.toString() === id.toString());
        // console.log(userPlaces, id);
    } catch (error) {
        return next(error);
    } finally {
        client.close();
    }

    if (!userPlaces[0]) {
        const error = new Http_Error('Could not find any places with this user id!', 404);
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

    let user;
    try {
        user = await User.findById(creatorId);
    } catch (error) {
        return next(new Http_Error('Could not find user when creating a place!', 404));
    }

    if(!user) {
        return next(new Http_Error('User with this id does not exist!', 500));
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newPlace.save({ session });

        user.places.push(newPlace);
        await user.save({ session });

        await session.commitTransaction();

        // await newPlace.save();
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
        return next(new Http_Error('Validation error!', 422));
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

    let user;
    let creatorId;
    try {
        const place = await Place.findById(id).exec();
        creatorId = place.creatorId;
    } catch (error) {
        return next(new Http_Error('Could not find the place to delete!', 500))
    }

    if(!creatorId) {
        return next(new Http_Error('Could not find creatorId for this place', 500));
    }

    try {
        user = await User.findById(creatorId).exec();
    } catch (error) {
        return next(new Http_Error('Could not find user for this place', 500));
    }

    try {
        user.places.pop(id);
        await user.save();
        await Place.deleteOne({ _id: id });
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