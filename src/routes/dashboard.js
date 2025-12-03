var express = require("express")
var router = express.Router()

var dashboardController = require("../controllers/dashboardController")

router.get("/aproveitamento/:idUsuario", function (req, res) {
    dashboardController.userPerformance(req, res)
})

router.get("/palpitesErrados/:idUsuario", function (req, res) {
    dashboardController.wrongs(req, res)
})

router.get("/palpitesCertos/:idUsuario", function (req, res) {
    dashboardController.rights(req, res)
})

router.get("/dados/:idUsuario", function (req, res) {
    dashboardController.dynamicDash(req, res)
})

module.exports = router