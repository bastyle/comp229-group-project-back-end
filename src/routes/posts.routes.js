let express = require('express');
let router = express.Router();

let passport = require('passport');
let postController = require('../controllers/post');

/*function requireAuth(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}*/

/* GET List page -- READ Operation */
router.get('/', postController.displayPostList);
router.get('/:id', postController.getPost);
router.post('/add', postController.addPost);
router.put('/edit/:id', postController.editPost);
router.delete('/delete/:id', postController.deletePost);

/*router.get('/', passport.authenticate("jwt",{session:false}), postController.displayPostList);
router.get('/:id', passport.authenticate("jwt",{session:false}),postController.getPost);
router.post('/add', passport.authenticate("jwt",{session:false}),postController.addPost);
router.put('/edit/:id', passport.authenticate("jwt",{session:false}),postController.editPost);
router.delete('/delete/:id', passport.authenticate("jwt",{session:false}),postController.deletePost);*/

module.exports = router;