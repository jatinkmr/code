const router = require('express').Router();
const { homeController, readCoilIdController, writeCoilIdController } = require('../controller')

router.get('/home', homeController)
router.get('/read-coils/:coilId', readCoilIdController)
router.post('/write-coils', writeCoilIdController)

module.exports = router;