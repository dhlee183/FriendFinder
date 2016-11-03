var friendData = require('../data/friend.js');

module.exports = function (app) {
	app.get('/api/friends', function (req, res) {
		res.json(friendData);
	});

	app.post('/api/friends', function(req,res){
		var newFriendData = req.body.scores;
		var scoresArray = [];
		var bestMatch = 0;

		for (var i = 0; i < friendData.length; i++){
			var scoresDiff = 0;

			for (var j = 0; j < newFriendData.length; j++){
				scoresDiff += (Math.abs(parseInt(friendData[i].scores[j]) - parseInt(newFriendData[j])));
			}

			scoresArray.push(scoresDiff);
		}

		for (var i = 0; i < scoresArray.length; i++){
			if(scoresArray[i] <= scoresArray[bestMatch]){
			bestMatch = i;
			}
		}

		res.json(friendData[bestMatch]);

		friendData.push(req.body);
	});
};