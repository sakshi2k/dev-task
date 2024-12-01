const db = require('../db');

// Start Timer
exports.startTimer = (req, res) => {
    const { startTime } = req.body;
    const userId = req.user.id;

    db.query('INSERT INTO timers (user_id, start_time, status) VALUES (?, ?, ?)', [userId, startTime, 'working'], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error starting timer' });
        res.json({ message: 'Timer started', timerId: results.insertId });
    });
};

// Pause Timer
exports.pauseTimer = (req, res) => {
    const { timerId, pauseTime } = req.body;

    db.query('UPDATE timers SET pause_time = ?, status = ? WHERE id = ?', [pauseTime, 'paused', timerId], (err) => {
        if (err) return res.status(500).json({ message: 'Error pausing timer' });
        res.json({ message: 'Timer paused' });
    });
};
