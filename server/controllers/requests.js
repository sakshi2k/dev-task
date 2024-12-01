const db = require('../db');

// Create Request
exports.createRequest = (req, res) => {
    const { type, details } = req.body;
    const userId = req.user.id;

    db.query('INSERT INTO requests (user_id, type, details, status) VALUES (?, ?, ?, ?)', [userId, type, details, 'pending'], (err) => {
        if (err) return res.status(500).json({ message: 'Error creating request' });
        res.json({ message: 'Request created' });
    });
};

// List Requests
exports.listRequests = (req, res) => {
    const userId = req.user.id;

    db.query('SELECT * FROM requests WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching requests' });
        res.json(results);
    });
};

// Approve Request
exports.approveRequest = (req, res) => {
    const { id } = req.params;

    db.query('UPDATE requests SET status = ? WHERE id = ?', ['approved', id], (err) => {
        if (err) return res.status(500).json({ message: 'Error approving request' });
        res.json({ message: 'Request approved' });
    });
};

// Reject Request
exports.rejectRequest = (req, res) => {
    const { id } = req.params;

    db.query('UPDATE requests SET status = ? WHERE id = ?', ['rejected', id], (err) => {
        if (err) return res.status(500).json({ message: 'Error rejecting request' });
        res.json({ message: 'Request rejected' });
    });
};
