const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const connection = require('./data/db.js');

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


// Rotta Index
app.get('/api/v1/movies', (req, res) => {

    // Definiamo la query SQL per ottenere i film
    const sql = 'SELECT * FROM movies';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })
})


// Rotta Show
app.get('/api/v1/movies/:id', (req, res) => {

    // Recuperiamo l'id dall'URL
    const id = req.params.id

    const sql = 'SELECT * FROM reviews JOIN movies ON reviews.movie_id = movies.id WHERE movie_id = ?'

    // Eseguiamo la query
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results);
    });
})
