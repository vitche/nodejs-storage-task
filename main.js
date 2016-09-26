var mongoose = require('mongoose');
module.exports = {
    entities: {
        TaskContext: mongoose.model('TaskContext',
            new mongoose.Schema({
                taskActionIdentifier: mongoose.Schema.Types.ObjectId,
                dateModified: {
                    type: Date,
                    default: Date.now
                },
                // New=1, Active=2, Processed=3, Finished=4
                state: {
                    type: Number,
                    min: 1,
                    max: 4
                },
                energySource: new mongoose.Schema({
                    privateKey: 'string',
                    publicKey: 'string'
                }),
                arguments: Object
            })
        )
    }
};
