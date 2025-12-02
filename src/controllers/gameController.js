var gameModel = require('../models/gameModel')

function generateResult(req, res) {
    var result = req.body.resultServer
    var homeTeam = req.body.homeTeamNameServer
    var visitingTeam = req.body.visitingTeamNameServer
    var competition = req.body.competitionServer
    var userId = req.body.userIdServer
    var matchId = req.body.matchIdServer

    if (result === undefined) {
        res.status(400).send('Resultado indefinido')
    } else if (homeTeam == undefined) {
        res.status(400).send('time da casa indefinido')
    } else if (visitingTeam === undefined) {
        res.status(400).send('time visistante indefinido')
    } else if (competition === undefined) {
        res.status(400).send('Competição indefinida')
    } else if (userId === undefined) {
        res.status(400).send('idUsuairio indefinido')
    } else if (matchId === undefined) {
        res.status(400).send('idPartida indefinido')
    } else {
        gameModel.generateResult(matchId, userId, homeTeam, visitingTeam, competition, result)
            .then(function (result) {
                res.status(200).json(result)
            }).catch(function (error) {
                res.status(500).json(error.sqlMessage)
            })
    }
}

function getLastMacthId(req, res) {
    var userId = req.params.idUsuario

    gameModel.getLastMacthId(userId).then(function (result) {
        if (result.length > 0) {
            res.json(result[0])
        } else {
            res.json({ idPartidaGerada: 0 })
        }

    }).catch(function (error) {
        res.status(500).json(error)
    })
}

function userPrediction(req, res) {
    var userGuess = req.body.userGuessServer
    var userId = req.body.userIdServer
    var guessId = req.body.guessIdServer
    var matchId = req.body.matchIdServer


    gameModel.userPrediction(guessId, userId, matchId, userGuess)
        .then(function (result) {
            res.status(200).json(result)
        }).catch(function (error) {
            res.status(500).json(error.sqlMessage)
        })
}

function getLastGuessId(req, res) {
    var userId = req.params.idUsuario

    gameModel.getLastGuessId(userId).then(function (result) {
        if (result.length > 0) {
            res.json(result[0])
        } else {
            res.json({ idPalpite: 0 })
        }
    }).catch(function (error) {
        res.status(500).json(error.sqlMessage)
    })
}

module.exports = {
    generateResult,
    userPrediction,
    getLastMacthId,
    getLastGuessId
}