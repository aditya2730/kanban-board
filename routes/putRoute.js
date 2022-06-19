const router = require('express').Router()
const verifyToken = require('../routes/verifyToken')
const Kanban = require('../models/kanban')

router.put('/:id/',verifyToken, async (req,res) => {
     try {
        const updatedKanban = await Kanban.findByIdAndUpdate(
            req.params.id, 
            {
            $set : req.body
            },
            {new : true}
           )
           res.status(200).json(updatedKanban)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
