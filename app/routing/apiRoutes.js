var friends = require('../data/friends');

var thisMatch;

module.exports = function(app) {
    app.get("/api/friends/", function(req, res) {
        return res.json(friends);
     
    });

    app.get("/api/thisMatch/", function(req, res) {
        return res.json(thisMatch);
        //$('#modal-text').html("Your match is:"+res.thisMatch.name);
    });

    app.post("/api/friends/", function(req, res) {
        var newFriend = req.body;        
        console.log('New: '+JSON.stringify(newFriend));
        thisMatch = compareFriends(newFriend);
        console.log(thisMatch);    
        friends.push(newFriend);
    });

    function compareFriends(arr) {
        var total = [];
        for (var prop in friends) {   
            var difference = [];        
            for (var i=0; i < friends[0].scores.length; i++) {
                var diff = Math.abs(arr.scores[i] - friends[prop].scores[i]);
                console.log('d '+diff);
                difference.push(diff);
            }
            var delta = difference.reduce((a, b) => a + b);
            console.log('Del: '+delta);
            total.push(delta);
            console.log('Tot: '+total)
        }
        var match = Math.min(...total);
        console.log('Match: '+match);
        var myIndex = total.indexOf(match);
        var myMatch = friends[myIndex];
        //console.log(myMatch);
        return myMatch;
    }
}