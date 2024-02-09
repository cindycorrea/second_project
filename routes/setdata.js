const router = require('express').Router();

const setdataController = require('../controllers/setdata');

router.get('/setdata', setdataController.test);
router.get('/setdata/:id', setdataController.getSet);
router.post('/setdata', setdataController.newSet);
router.put('/setdata', setdataController.updateSet);
router.delete('/setdata', setdataController.deleteSet);

module.exports = router;