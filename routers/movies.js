const router = require('express').Router();
const MovieController = require('../controllers/MovieController.js');

// index
router.get('/', MovieController.index);

// Show
router.get('/:id', MovieController.show);

router.post('/:id/review', MovieController.review);

module.exports = router;