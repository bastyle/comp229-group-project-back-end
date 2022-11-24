let express = require('express');
let router = express.Router();

//let jwt = require('jsonwebtoken');

//let passport = require('passport');

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
router.get('/', postController.displayPostList);

/* POST Route for processing the Add Post Page */
//router.post('/add', postController.processAddPage);

module.exports = router;