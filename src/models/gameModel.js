var database = require('../database/config')

function generateResult(homeTeam, visitingTeam, competicao, resultadoPartida) {
    var instruction = `
        INSERT INTO partidaGerada (confronto, competicao, resultadoPartida) VALUES ('${homeTeam} x ${visitingTeam}', '${competicao}', '${resultadoPartida}')
    `

    return database.executar(instruction)
}

module.exports = {
    generateResult
}