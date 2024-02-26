const router = require('express').Router();
const { requiresAuth } = require("express-openid-connect");
const setController = require('../controllers/sets');

router.get('/sets', setController.allSets);
router.get('/sets/:id', setController.getSet);
router.post('/sets', requiresAuth(), setController.newSet);
router.put('/sets/:id', requiresAuth(), setController.updateSet);
router.delete('/sets/:id', requiresAuth(), setController.deleteSet);

module.exports = router;