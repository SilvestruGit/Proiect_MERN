const express = require('express');

const placesControllers = require('../Controllers/places-controllers');

const router = express.Router();

router.get('/:id', placesControllers.getplacesById);

router.get('/user/:id', placesControllers.getPlacesbyUserId);

router.post('/', placesControllers.createPlace);

router.patch('/:id', placesControllers.updatePlace);

router.delete('/:id', placesControllers.deletePlace);

module.exports = router;