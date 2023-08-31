const express = require('express');
const bodyParser = require('body-parser');

const placesRouter = require('./routes/places-routes');
const userRouter = require('./routes/user-routes');

const server = express();

server.use('/api/places', placesRouter);
server.use('/api/users', userRouter);


server.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.status || 500);
    res.json({message: error.message || 'An error has occured!'});
})

server.listen(5000, () => console.log('Server is listening on port 5000'));