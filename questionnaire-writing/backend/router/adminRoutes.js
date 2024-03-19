const express = require('express');
const adminController = require('../controller/adminController');
const { passport, requireAuth } = require('../utils/passport');

const router = express.Router();

router.post('/login', adminController.loginAdmin);
router.get('/login', requireAuth, adminController.loginWithToken);
router.post('/signup', adminController.signupAdmin);
router.put('/update/password', requireAuth, adminController.updatePassword);

module.exports = router;