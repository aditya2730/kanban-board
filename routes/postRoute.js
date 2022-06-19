const router = require('express').Router()
const Kanban = require('../models/kanban')
const verifyToken = require('../routes/authRoute')

router.post("/", verifyToken, async (req, res) => {
    const newKanban = new Kanban(req.body);
  
    try {
      const savedKanban = await newKanban.save();
      res.status(200).json(savedKanban);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router
