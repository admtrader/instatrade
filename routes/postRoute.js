const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');


router.get('/', postCtrl.indexPage);

router.get('/new', postCtrl.showNew);

router.post('/', postCtrl.createPost);

router.get('/:id', postCtrl.showOnePost);

router.delete('/:id', postCtrl.deletePost);

module.exports = router;