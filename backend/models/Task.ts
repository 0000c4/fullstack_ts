const {Schema, model} = require('mongoose');

const TaskSchema = new Schema({
    key: {type: Number},
    name: {type: String, required: true},
    description: {type: String, required: true},
    created_at: {type: String, required: true},
    tags: {type: String},
    date_of_completion: {type: String},
    custom_fields: [{
        key: {type: String},
        value: {type: String}
    }]
})

export const Task = model('Task', TaskSchema);
