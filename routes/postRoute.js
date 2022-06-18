const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');
//Auth init
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
// multer init
const multer = require('multer');
const storage = multer.memoryStorage();
upload = multer({storage: storage})


router.get('/', postCtrl.indexPage);

router.get('/new', requiresAuth(), postCtrl.showNew);

router.post('/', upload.single('image'), postCtrl.createPost);

router.get('/:id', postCtrl.showOnePost);

router.delete('/:id', postCtrl.deletePost);

module.exports = router;