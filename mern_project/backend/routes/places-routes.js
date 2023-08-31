const express = require('express');
const Http_Error = require('../Models/http-error');

const router = express.Router();

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

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const place = DUMMY_PLACES.find(place => place.id === id);

    if (!place) {
        const error = Http_Error('Could not find place with this id!', 404);
        return next(error);
    }

    res.json({ place });
})

router.get('/user/:id', (req, res, next) => {
    const id = req.params.id;
    const userPlaces = DUMMY_PLACES.filter(place => place.creatorId === Number(id));

    if (!userPlaces.first) {
        const error = new Http_Error('Could not find place with this user id!', 404);
        return next(error);
    }

    res.json(userPlaces);
})

module.exports = router;