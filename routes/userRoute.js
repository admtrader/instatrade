const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const user = require('../models/user');


router.get('/', userCtrl.indexPage);

router.get('/new', userCtrl.showNew);

router.post('/', userCtrl.createUser);

module.exports = router;