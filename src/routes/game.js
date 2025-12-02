var express = require("express");
var router = express.Router();

var gameController = require("../controllers/gameController")

router.post("/partida", function (req, res) {
    gameController.generateResult(req,res)
});

module.exports = router;