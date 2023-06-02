const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    content: { type: String },
    time: { 
        type: Date,
        default: Date.now
     },
    action: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model("todo", todoSchema);


module.exports = {
    Todo
}
