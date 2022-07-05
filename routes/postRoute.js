const express = require('express');
const passport = require('passport');
const router = express.Router();
const postCtrl = require('../controllers/postController');



router.get('/', postCtrl.indexPage);

router.get('/new', postCtrl.showNew);

router.post('/', passport.authenticate('jwt', { session: false }), postCtrl.createPost);

router.get('/:id', postCtrl.showOnePost);

router.delete('/:id', postCtrl.deletePost);

module.exports = router;