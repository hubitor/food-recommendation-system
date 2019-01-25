const router = require('express').Router();

const user = require('../controllers/user');

router.get('/main', user.main);
router.post('/create', user.create);
router.post('/auth', user.auth);

module.exports = router;
