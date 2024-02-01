const express = require('express');
const { visitorController } = require('../controller/visitors.controller');

const router = express.Router();
// route to create mock data for UI 
router.post("/add_visitors", visitorController.createVisitor);
router.post("/average_visit_times", visitorController.getVisitorsStat);

module.exports = router;