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

    const id = req.params.id
    const sql = 'SELECT * FROM movies WHERE id = ?';
    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id=? ORDER BY id ASC'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ err: err })

        if (results.length == 0) return res.status(404).json({ err: 'movie not found' })

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err })

            const movie = {
                ...results[0],
                reviews: reviewsResults
            }

            res.json(movie)
        })
    })
}


module.exports = {
    index,
    show
}