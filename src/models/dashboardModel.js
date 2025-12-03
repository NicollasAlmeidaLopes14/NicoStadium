var database = require("../database/config")

function userPerformance(userId) {
    var instruction = `
    SELECT 
    CONCAT(
        TRUNCATE(
            (
                (SELECT COUNT(*) 
                 FROM palpiteUsuario pu 
                 JOIN partidaGerada pg ON pu.fkPartidaGerada = pg.idPartidaGerada
                 WHERE pu.palpite = pg.resultadoPartida
                 AND pg.fkUsuario = ${userId})
                /
                (SELECT COUNT(*) 
                 FROM partidaGerada 
                 WHERE fkUsuario = ${userId})
            ) * 100
        , 0),
    '%') AS Aproveitamento;
    `

    return database.executar(instruction)
}

function wrongs(userId) {
    var instruction = `
    SELECT COUNT(*) as 'Erros' FROM partidaGerada
        JOIN palpiteUsuario ON fkPartidaGerada = idPartidaGerada
	WHERE palpite <> resultadoPartida AND partidaGerada.fkUsuario = ${userId};
    `

    return database.executar(instruction)
}

function rights(userId) {
    var instruction = `
        SELECT COUNT(*) as 'Acertos' FROM partidaGerada
        JOIN palpiteUsuario ON fkPartidaGerada = idPartidaGerada
	    WHERE palpite = resultadoPartida AND partidaGerada.fkUsuario = ${userId};
    `

    return database.executar(instruction)
}

function dynamicDash(userId) {
    var instruction = `
   SELECT 
    CASE 
        WHEN pu.palpite = pg.resultadoPartida THEN 1
        ELSE 0
    END AS Acerto
    FROM partidaGerada pg
    JOIN palpiteUsuario pu ON pu.fkPartidaGerada = pg.idPartidaGerada
    WHERE pg.fkUsuario = ${userId}
    ORDER BY pg.idPartidaGerada;
   `

    return database.executar(instruction)
}

module.exports = {
    userPerformance,
    wrongs,
    rights,
    dynamicDash
}