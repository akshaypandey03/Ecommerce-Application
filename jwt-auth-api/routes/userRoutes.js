const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, (req, res) => {
     res.json({
         id: req.user._id,
         name: req.user.name,
         email: req.user.email,
     });
});

module.exports = router;