let express = require('express');
let router = express.Router();

//let jwt = require('jsonwebtoken');

let passport = require('passport');



let postController = require('../controllers/post');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET List page -- READ Operation */
router.get('/', passport.authenticate("jwt",{session:false}), postController.displayPostList);

router.get('/:id', passport.authenticate("jwt",{session:false}), postController.getPost);

/* POST Route for processing the Add Post Page */
router.post('/add', passport.authenticate("jwt",{session:false}), postController.addPost);

/* PUT Route - Process Update by Post ID */
router.put('/edit/:id', passport.authenticate("jwt",{session:false}), postController.editPost);

/* DELETE Route - Delete Post by Post ID */
router.delete('/delete/:id', passport.authenticate("jwt",{session:false}), postController.deletePost);

module.exports = router;