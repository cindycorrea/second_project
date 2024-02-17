const router = require('express').Router();

const setController = require('../controllers/sets');

router.get('/sets', setController.allSets);
router.get('/sets/:id', setController.getSet);
router.post('/sets', setController.newSet);
router.put('/sets/:id', setController.updateSet);
router.delete('/sets/:id', setController.deleteSet);

module.exports = router;