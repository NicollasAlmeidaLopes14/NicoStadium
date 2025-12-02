var gameModel = require('../models/gameModel')

function generateResult(req, res) {
    var result = req.body.resultServer
    var homeTeam = req.body.homeTeamNameServer
    var visitingTeam = req.body.visitingTeamNameServer
    var competition = req.body.competitionServer

    gameModel.generateResult(homeTeam, visitingTeam, competition, result).
        then(function (result) {
            res.status(200).json(result)
        }).catch(function (error) {
            res.status(500).json(error.sqlMessage)
        })
}

module.exports = {
    generateResult
}