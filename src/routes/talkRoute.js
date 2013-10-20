module.exports = function(app) {

    var TalkService = require('../services/talkService.js');

    // GET - Return all talks in the DB
    var findTalks = function(req, res) {

        console.log('GET - routes/talkRoute.js/findTalks');

        TalkService.findAllTalks({

            onSuccess: function(talks) {
                res.jsonp(talks);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // GET - Return a talk with specified ID
    var findTalk = function(req, res) {

        console.log('GET - routes/talkRoute.js/findTalk');

        var talkId = req.params.talkId;
        console.log('talkId=' + talkId);

        TalkService.findTalkById({

            talkId: talkId,

            onSuccess: function(talk) {
                res.jsonp(talk);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // POST - Insert a new talk in the DB
    var addTalk = function(req, res) {

        console.log('POST - routes/talkRoute.js/addTalk');

        TalkService.saveTalk({

            talkName:           req.body.talkName,
            talkDate:           req.body.talkDate,
            talkSpeaker:        req.body.talkSpeaker,
            talkSpeakerMail:    req.body.talkSpeakerMail,
            talkPoints:         req.body.talkPoints,

            onSuccess: function(talk) {
                res.jsonp(talk);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // PUT - Update a register already exists
    var updateTalk = function(req, res) {

        console.log('PUT - routes/talkRoute.js/updateTalk');
        
        var talkId = req.params.talkId;
        console.log('talkId=' + talkId);

        TalkService.findTalkByIdAndUpdate({

            talkId:             talkId,
            talkName:           req.body.talkName,
            talkDate:           req.body.talkDate,
            talkSpeaker:        req.body.talkSpeaker,
            talkSpeakerMail:    req.body.talkSpeakerMail,
            talkPoints:         req.body.talkPoints,

            onSuccess: function(talk) {
                res.jsonp(talk);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // DELETE - Delete a talk with specified ID
    var deleteTalk = function(req, res) {

        console.log('DELETE - routes/talkRoute.js/deleteTalk');
        
        var talkId = req.params.talkId;
        console.log('talkId=' + talkId);

        TalkService.findTalkByIdAndRemove({

            talkId: talkId,

            onSuccess: function(talk) {
                res.jsonp(talk);
            },
            
            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // Link routes and functions
    app.get(    '/talk',         findTalks);
    app.get(    '/talk/:talkId', findTalk);
    app.post(   '/talk',         addTalk);
    app.put(    '/talk/:talkId', updateTalk);
    app.delete( '/talk/:talkId', deleteTalk);
}
