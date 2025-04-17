const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const MoviesRouter = require('./routers/movies.js');
const ReviewsRouter = require('./routers/reviews.js');
const errorHandler = require('./middlewares/serverError')
const routeNotFound = require('./middlewares/routeNotFound')

// Middleware
app.use(cors(
    {
        origin: process.env.FRONT_URL || 'http://localhost:5173',
    }
));


// Middleware per parsing JSON
app.use(express.json());

// static assets middleware
app.use(express.static('public'));

// Rotta base
app.get('/', (req, res) => {
    res.send('Benvenuto nella tua app Express!');
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server attivo su http://localhost:${PORT}`);
});

// Use the movies router
app.use('/api/v1/movies', MoviesRouter)


// Use the reviews router
app.use('/api/v1/reviews', ReviewsRouter)


// Registro il middleware per la gestione errori
app.use(errorHandler)

// Registro il middleware per rotta inesistente
app.use(routeNotFound)