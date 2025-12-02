var database = require('../database/config')

function generateResult(matchId, userId, homeTeam, visitingTeam, competicao, resultadoPartida) {
    var instruction = `
        INSERT INTO partidaGerada (idPartidaGerada, fkUsuario, confronto, competicao, resultadoPartida) VALUES (${matchId}, ${userId},'${homeTeam} x ${visitingTeam}', '${competicao}', '${resultadoPartida}')
    `

    return database.executar(instruction)
}

function getLastMacthId(userId) {
    var instruction = `
    SELECT idPartidaGerada FROM partidaGerada WHERE fkUsuario = ${userId} ORDER BY idPartidaGerada DESC LIMIT 1
    `

    return database.executar(instruction)
}

function userPrediction(guessId, userId, matchId, userGuess) {
    var instruction = `
    INSERT INTO palpiteUsuario (idPalpite, fkUsuario,fkPartidaGerada, palpite) VALUES (${guessId}, ${userId}, ${matchId}, '${userGuess}')
    `

    return database.executar(instruction)
}

function getLastGuessId(userId) {
    var instruction = `
    SELECT idPalpite FROM palpiteUsuario WHERE fkUsuario = ${userId} ORDER BY idPalpite DESC LIMIT 1
    `

    return database.executar(instruction)
}

module.exports = {
    generateResult,
    getLastMacthId,
    userPrediction,
    getLastGuessId
}