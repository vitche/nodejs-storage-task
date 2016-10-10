var mongoose = require('mongoose');
var bitCoinClient = require('bitcoinjs-lib');
module.exports = {
    connect: function (databaseUri, callback) {
        mongoose.connect(databaseUri, function (error) {
            if (error) {
                callback(error);
                return;
            }
            callback();
        });
    },
    disconnect: function () {
        mongoose.disconnect();
    },
    entities: {
        EnergySource: function () {
            var keyPair = bitCoinClient.ECPair.makeRandom();
            this.privateKey = keyPair.toWIF();
            this.publicKey = keyPair.getAddress();
            return this;
        },
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
        ),
        TaskState: {
            Unknown: 0,
            New: 1,
            Active: 2,
            Processed: 3,
            Finished: 4
        }
    }
};
