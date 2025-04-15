const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connection = require('./data/db.js');

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

app.get('/api/v1/movies', (req, res) => {

    // Definiamo la query SQL per ottenere i film
    const sql = 'SELECT * FROM movies';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })
})
