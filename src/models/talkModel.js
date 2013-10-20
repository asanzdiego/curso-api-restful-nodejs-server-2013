var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var talkSchema = new Schema({
    talkName:           { type: String, required: true },
    talkDate:           { type: Date,   required: true },
    talkSpeaker:        { type: String, required: true },
    talkSpeakerMail:    { type: String, required: true, match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ },
    talkPoints:         { type: Number, required: true, default:0 }
});

module.exports = mongoose.model('Talk', talkSchema);
