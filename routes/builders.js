const router = require('express').Router();

const testFunctions = require('../controllers/builders');

router.get('/builders', testFunctions.test);
router.get('/builders/:id', testFunctions.getBuilder);
router.post('/builders', testFunctions.newBuilder);

module.exports = router;