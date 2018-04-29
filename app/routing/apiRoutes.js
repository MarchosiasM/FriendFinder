let friendData = require('../data/friends.json')
const fs = require('fs')

console.log("FriendData loaded as " + (friendData))
console.log("First entry is " + friendData[0])

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  app.post("/api/friends", function(req, res) {
      
    friendData.push(req.body)

    fs.writeFile("./app/data/friends.json", JSON.stringify(friendData), "utf8", (error) => {
        if (error) console.log(`Something wrong with your file write. ${error}`)
    })

    res.json(matchLogic(req.body))
    res.json(true)
  })
};


function matchLogic(newUser) {
    // Iterate over the entries in friend data and compare the newUser's totals to the others, then return the closest match (lowest abs difference)
    // In the case of ties, return the last one calculated
    console.log("Match logic received " +newUser + " for new user data")
    let closestMatch = 0;
    let newUserTotal = 0;
    let userTotal = 0;
    let bestDiff = 100;
    let diff = 0;

    newUserTotal = newUser.scores.reduce(sum, 0)
    console.log("New users total is " + newUserTotal)

    // This should iterate over all friend data minus the last (presumably, she who was just added
    for (let i = 0; i < friendData.length - 1; i++) {
        console.log("Loop logic on " + i + " loop")
        // console.log(friendData.scores)
        userTotal = Math.abs(friendData[i].scores.reduce(sum, 0))
        diff = Math.abs(newUserTotal - userTotal)
        console.log("This user had a diff of " + diff + " and a total of " + userTotal)
        if (diff < bestDiff) {
            console.log("Inside the testing logic. userTotal is " + userTotal + " and closest match is " )
            closestMatch = i;
            bestDiff = diff;
        }
    }
    console.log("This function thinks " + friendData[closestMatch].name + " is the best match, with a score of " + friendData[closestMatch].scores.reduce(sum, 0))
    return friendData[closestMatch]
}

function sum(a, b) {
    return parseInt(a) + parseInt(b);
}