const mongoose = require('mongoose')
const WeightRecordSchema = mongoose.Schema({
    date: {
        type: Date,
        require: true,
    },
    weight: {
        type: Number,
        require: true,
    },
    fat: {
        type: Number,
        require: true,
    },
    muscle: {
        type: Number,
        require: true,
    },
    lose: {
        type: Number,
        require: true,
    },
    percent: {
        type: Number,
        require: true,
    },
    content: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('WeightRecord', WeightRecordSchema)