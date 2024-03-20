const express = require('express');
const feedbackController = require('../controller/feedbackController');
const { passport, requireAuth } = require('../utils/passport');

const router = express.Router();

router.post('/post', feedbackController.createAFeedback);
router.get('/all', feedbackController.getAllFeedbacks);
router.put('/response/:id', requireAuth, feedbackController.updateAResponse);

module.exports = router;