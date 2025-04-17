const connection = require('../data/db.js');

function index(req, res) {

    // Definiamo la query SQL per ottenere i film
    const sql = 'SELECT * FROM reviews';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })

}

function show(req, res) {

    const id = req.params.id
    const sql = 'SELECT * FROM reviews WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ err: err })

        if (results.length == 0) return res.status(404).json({ err: 'movie not found' })

        res.json(results[0])
    })


}


function store(req, res) {

    const { movie_id, name, text, vote } = req.body
    const sql = 'INSERT INTO reviews (movie_id, name, text, vote) VALUES (?, ?, ?, ?)'

    const values = [movie_id, name, text, vote]

    connection.query(sql, values, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json({
            id: results.insertId,
            movie_id,
            name,
            text,
            vote
        })
    })

}

module.exports = {
    index,
    show,
    store
}