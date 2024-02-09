const router = require('express').Router();

const buildersController = require('../controllers/builders');

router.get('/builders', buildersController.test);
router.get('/builders/:id', buildersController.getBuilder);
router.post('/builders', buildersController.newBuilder);
router.put('/builders', buildersController.updateBuilder);
router.delete('/builders', buildersController.deleteBuilder);

module.exports = router;