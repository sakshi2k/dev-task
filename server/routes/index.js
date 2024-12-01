const express = require('express');
const { startTimer, pauseTimer } = require('../controllers/timers');
const { createRequest, listRequests, approveRequest, rejectRequest } = require('../controllers/requests');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// Timer routes
router.post('/timer/start?type=', authMiddleware, startTimer);
router.post('/timer/pause?type=', authMiddleware, pauseTimer);

// Requests routes
router.post('/requests', authMiddleware, createRequest);
router.get('/requests', authMiddleware, listRequests);
router.put('/requests/:id/approve', authMiddleware, approveRequest);
router.put('/requests/:id/reject', authMiddleware, rejectRequest);

module.exports = router;
