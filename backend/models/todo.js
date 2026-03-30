const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    isChecked: {
        required: true,
        type: Boolean,
    },
    name: {
        required: true,
        type: String,
    },
});

module.exports = mongoose.model('todo', dataSchema);
