const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const MoviesRouter = require('./routers/movies.js');

// Middleware
app.use(cors(
    {
        origin: process.env.FRONT_URL || 'http://localhost:5173',
    }
));


// Middleware per parsing JSON
app.use(express.json());

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