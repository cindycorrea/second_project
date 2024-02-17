const router = require('express').Router();

const buildersController = require('../controllers/builders');

router.get('/builders', buildersController.getAllBuilders);
router.get('/builders/:id', buildersController.getBuilder);
router.post('/builders', buildersController.newBuilder);
router.put('/builders/:id', buildersController.updateBuilder);
router.delete('/builders/:id', buildersController.deleteBuilder);

module.exports = router;