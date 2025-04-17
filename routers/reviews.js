const router = require('express').Router();
const ReviewController = require('../controllers/ReviewController.js');

// index
router.get('/', ReviewController.index);

// Show
router.get('/:id', ReviewController.show);

router.post('/', ReviewController.store);

module.exports = router;