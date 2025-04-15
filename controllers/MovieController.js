const connection = require('../data/db.js');

function index(req, res) {

    // Definiamo la query SQL per ottenere i film
    const sql = 'SELECT * FROM movies';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })
}

function show(req, res) {

    // Recuperiamo l'id dall'URL
    const id = req.params.id

    // Utilizzo JOIN per recuperare i dati del film e le recensioni associate
    const sql = `SELECT movie_id, title, director, genre, release_year, abstract, image, movies.created_at AS movie_created, movies.updated_at AS movie_updates, reviews.id AS review_id, name, vote, text, reviews.created_at AS review_created, reviews.updated_at AS review_updated
    FROM reviews
    JOIN movies ON reviews.movie_id = movies.id
    WHERE movie_id = ?`

    // Eseguiamo la query
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results);
    });
}

module.exports = {
    index,
    show
}