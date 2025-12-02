var express = require("express");
var router = express.Router();

var gameController = require("../controllers/gameController")

router.post("/partida", function (req, res) {
    gameController.generateResult(req, res)
});

router.get("/ultimaPartida/:idUsuario", function (req, res) {
    gameController.getLastMacthId(req, res)
})

router.post("/palpite", function (req, res) {
    gameController.userPrediction(req, res)
})

router.get("/ultimoPalpite/:idUsuario", function (req, res) {
    gameController.getLastGuessId(req, res)
})

module.exports = router;