const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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
