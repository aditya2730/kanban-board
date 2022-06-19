const mongoose = require('mongoose')


const kanbanSchema = new mongoose.Schema({
    id:{type: Number, unique: true},
    stage:{type: Number, max: 3, default:1},
    title:{type: String, required:true, unique:true},
})

module.exports = mongoose.model("Kanban", kanbanSchema)
