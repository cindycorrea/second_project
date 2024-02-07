const router = require('express').Router();

const testFunctions = require('../functions/testFunctions');

router.get('/test', testFunctions.test);
router.get('/test/:id', testFunctions.getCindy);
router.post('/test', testFunctions.postMario);

module.exports = router;