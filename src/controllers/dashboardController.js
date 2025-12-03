var dashboardModel = require('../models/dashboardModel')

function userPerformance(req, res) {
    var userId = req.params.idUsuario

    dashboardModel.userPerformance(userId).then(function (result) {
        res.json(result[0])
    }).catch(function (error) {
        res.status(500).json(error.sqlMessage)
    })
}

function wrongs(req, res) {
    var userId = req.params.idUsuario

    dashboardModel.wrongs(userId).then(function (result) {
        res.json(result[0])
    }).catch(function (error) {
        res.status(500).json(error.sqlMessage)
    })
}

function rights(req, res) {
    var userId = req.params.idUsuario

    dashboardModel.rights(userId).then(function (result) {
        res.json(result[0])
    }).catch(function (error) {
        res.status(500).json(error.sqlMessage)
    })
}

function dynamicDash(req, res) {
    var userId = req.params.idUsuario

    dashboardModel.dynamicDash(userId).then(function (result) {
        res.status(200).json(result)
    }).catch(function (error) {
        res.status(500).json(error.sqlMessage)
    })
}

module.exports = {
    userPerformance,
    wrongs,
    rights,
    dynamicDash

} 