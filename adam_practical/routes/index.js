const router = require('express').Router();
const { homeController, writeCoilIdController } = require('../controller')

router.get('/home', homeController)
router.post('/write-coils', writeCoilIdController)

module.exports = router;