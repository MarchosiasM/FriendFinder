let friendData = require('../data/friends.json')
console.log(friendData)

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body)
    friendData.push(req.body)
    res.json(matchLogic())
    res.json(true)
  })


};


function matchLogic(newUser) {
    // Iterate over the entries in friend data and compare the newUser's totals to the others, then return the closest match (lowest abs difference)
    // In the case of ties, return the last one calculated

    let closestMatch = 0;
    let newUserTotal = 0;

    newUserTotal = newUser.scores.reduce(sum, 0)

    // This should iterate over all friend data minus the last (presumably, she who was just added
    for (let i = 0; i < friendData - 1; i++) {
        let userTotal = Math.abs(friendData.scores.reduce(sum, 0))
        if (userTotal > closestMatch) {
            closestMatch = i;
        }
    }
    return friendData[i]
}

function sum(a, b) {
    return a + b;
}