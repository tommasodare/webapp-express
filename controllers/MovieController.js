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
    const movieId = Number(req.params.id)

    const sql = `SELECT * FROM movies JOIN reviews ON reviews.movie_id = ${movieId} `

    connection.query(sql, [movieId], (err, results) => {
        if (err) return res.status(500).json({
            error: 'Query failed'
        })
        if (results.length === 0) return res.status(404).json({
            message: 'There is nothing to show'
        })
        const movie = results[0]

        res.json(movie)
    })
}


module.exports = {
    index,
    show
}

/* function show(req, res) {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM movies WHERE id = ?'
    const sqlReviews = 'SELECT * FROM reviews WHERE movie_id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Movie not found' });

        const movie = results[0]
        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: err.message });
            movie.reviews = reviews;
            console.log(movie.reviews);
        })

        res.json(movie);
    })
} */

/* function show(req, res) {

    // Recuperiamo l'id dall'URL
    const id = req.params.id

    // Utilizzo JOIN per recuperare i dati del film e le recensioni associate
    const sql = `SELECT movie_id, title, director, genre, release_year, abstract, image, movies.created_at AS movie_created, movies.updated_at AS movie_updates, reviews.id , name, vote, text, reviews.created_at, reviews.updated_at AS review_updated
        FROM reviews
        JOIN movies ON reviews.movie_id = movies.id
        WHERE movie_id = ?`

    // Eseguiamo la query
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results);
    });
} */