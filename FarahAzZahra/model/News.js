const { date } = require('joi');
const mongoose = require('mongoose');
const newsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    image:{
        type: String
    },
    keyword: {
        type: String,
        require: true
    },
    tgl_post: {
        type: Date,
        default: Date.now
    },
    tgl_update: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('News', newsSchema);