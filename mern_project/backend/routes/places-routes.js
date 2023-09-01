const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../Controllers/places-controllers');

const router = express.Router();

router.get('/:id', placesControllers.getplacesById);

router.get('/user/:id', placesControllers.getPlacesbyUserId);

router.post(
    '/',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 })
    ],
    placesControllers.createPlace);

router.patch(
    '/:id',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 })
    ],
    placesControllers.updatePlace);

router.delete('/:id', placesControllers.deletePlace);

module.exports = router;