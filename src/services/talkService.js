var Talk = require('../models/talkModel.js');

var findAllTalks = function(options) {

    console.log('services/talkService.js/findAllTalks');
    console.log('options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Talk.find(function(error, talks) {

        if(!error) {

            console.log('talks=' + talks);
            options.onSuccess(talks);

        } else {

            console.log('ERROR retrieving talks: ' + error);
            options.onError(error);
        }
    });
};

var findTalkById = function(options) {

    console.log('services/talkService.js/findTalkById');
    console.log('options=%j', options);

    options.talkId    = options.talkId    || 0;
    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Talk.findById(options.talkId, function(error, talk) {

        if(!error) {

            if(talk) {

                console.log('talk=' + talk);
                options.onSuccess(talk);

            } else {

                var errorMessage = 'Talk not found';
                console.log('ERROR retrieving talk with talkId="' + options.talkId + '": ' + errorMessage);
                options.onError(errorMessage);
            }
        } else {

            console.log('ERROR retrieving talk with talkId="' + options.talkId + '": ' + error);
            options.onError(error);
        }
    });
};

var saveTalk = function(options) {

    console.log('services/talkService.js/saveTalk');
    console.log('options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    var talk = options.talk || new Talk({
        talkName:           options.talkName,
        talkDate:           options.talkDate,
        talkSpeaker:        options.talkSpeaker,
        talkSpeakerMail:    options.talkSpeakerMail,
        talkPoints:         options.talkPoints
    });

    talk.save(function(error, newTalk) {

        if(!error && newTalk) {

            console.log('talk=' + newTalk + ' saved');
            options.onSuccess(newTalk);

        } else {

            console.log('ERROR saving talk=' + talk + ': ' + error);
            options.onError(error);
        }
    });
};

var findTalkByIdAndUpdate = function(options) {

    console.log('services/talkService.js/findTalkByIdAndUpdate');
    console.log('options=%j', options);

    findTalkById({
        talkId: options.talkId,
        onSuccess: function(talk) {

            talk.talkName        = options.talkName,
            talk.talkDate        = options.talkDate,
            talk.talkSpeaker     = options.talkSpeaker,
            talk.talkSpeakerMail = options.talkSpeakerMail,
            talk.talkPoints      = options.talkPoints

            saveTalk({
                talk: talk,
                onSuccess: options.onSuccess,
                onError: options.onError
            });
        },
        onError : options.onError,
    });
};

var findTalkByIdAndRemove = function(options) {

    console.log('services/talkService.js/findTalkByIdAndRemove');
    console.log('options=%j', options);

    findTalkById({
        talkId: options.talkId,
        onSuccess: function(talk) {

            talk.remove(function(error) {

                if(!error) {

                    console.log('talk=' + talk + ' removed');
                    options.onSuccess(talk);

                } else {

                    console.log('ERROR removing talk=' + talk + ': ' + error);
                    options.onError(error);
                }
            });
        },
        onError : options.onError
    });
};

exports.findAllTalks          = findAllTalks;
exports.findTalkById          = findTalkById;
exports.saveTalk              = saveTalk;
exports.findTalkByIdAndUpdate = findTalkByIdAndUpdate;
exports.findTalkByIdAndRemove = findTalkByIdAndRemove;
