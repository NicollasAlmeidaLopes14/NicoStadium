
var generateClashChampionsButton = document.getElementById('clash-button-champions')
var generateClashLibertadoresButton = document.getElementById('clash-button-libertadores')
var showResultButton = document.getElementById('show-result-button')
var gameMask = document.getElementById('mask')
var generatorBox = document.getElementById('generator-box')

var homeTeamButton = document.getElementById('home-team-button')
var visitingTeamButton = document.getElementById('visiting-team-button')
var drawButton = document.getElementById('draw-button')

var homeTeamGoalsSpan = document.getElementById('home-team-goals')
var visitingTeamGoalsSpan = document.getElementById('visiting-team-goals')

var generatorBoxTitle = document.getElementById('generator-box-title')

var guessContainer = document.querySelector('.dialog-container')

var hideButton = document.querySelectorAll('.hide-button')

var newClashButton = document.getElementById('new-clash-button')

var competitionName = ''

var userId = sessionStorage.getItem('ID_USUARIO')
var newMatchId
var newGuessId


function loadTeams() {
    fetch('/data/teams.json').then(function (response) {
        if (response.ok) {
            response.json().then(data => {
                var championsContainer = document.getElementById('champions-team-container')
                var libertadoresContainer = document.getElementById('libertadores-teams-container')

                data[0].champions.forEach(championsTeam => {
                    var championsTeamImage = document.createElement('img')
                    championsTeamImage.src = championsTeam.logo
                    championsTeamImage.alt = championsTeam.name
                    championsTeamImage.id = championsTeam.styleId
                    championsTeamImage.classList.add('champions-team-logo')

                    championsContainer.appendChild(championsTeamImage)
                });

                data[1].libertadores.forEach(libertadoresTeam => {
                    var libertadoresTeamImage = document.createElement('img')
                    libertadoresTeamImage.src = libertadoresTeam.logo
                    libertadoresTeamImage.alt = libertadoresTeam.name
                    libertadoresTeamImage.id = libertadoresTeam.styleId

                    libertadoresContainer.appendChild(libertadoresTeamImage)
                });
            })
        } else {
            console.log('Erro no fetch da função loadTeams')
            throw new Error('Erro ao carregar arquivo JSON:' + response.status)
        }
    })
}


function generateClash(competition) {
    var homeTeamLogo = document.getElementById('home-team-logo')
    var visitingTeamLogo = document.getElementById('visiting-team-logo')
    var homeTeamButton = document.getElementById('home-team-button')
    var visitingTeamButton = document.getElementById('visiting-team-button')

    var firstRandomTeam = Math.floor(Math.random() * 10)
    var secondRandomTeam = Math.floor(Math.random() * 9)

    if (competition === 'champions') {
        fetch('/data/teams.json').then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    var homeTeam = data[0].champions[firstRandomTeam]

                    var newData = data[0].champions.filter(updatedData => {
                        return updatedData != homeTeam
                    })

                    var visitingTeam = newData[secondRandomTeam]

                    homeTeamLogo.src = homeTeam.logo
                    homeTeamButton.innerText = homeTeam.nickName

                    visitingTeamLogo.src = visitingTeam.logo
                    visitingTeamButton.innerText = visitingTeam.nickName

                    competitionName = 'Champions League'

                    disableResultButton()
                })
            } else {
                console.log("Erro no fetch da função generateClash")
                throw new Error("Erro ao carregar arquivo JSON" + response.status)
            }
        })

    } else {
        fetch('/data/teams.json').then((response => {
            if (response.ok) {
                response.json().then(data => {
                    var homeTeam = data[1].libertadores[firstRandomTeam]

                    var newData = data[1].libertadores.filter(updatedData => {
                        return updatedData != homeTeam
                    })

                    console.log(newData)

                    var visitingTeam = newData[secondRandomTeam]

                    homeTeamLogo.src = homeTeam.logo
                    homeTeamButton.innerText = homeTeam.name

                    visitingTeamLogo.src = visitingTeam.logo
                    visitingTeamButton.innerText = visitingTeam.name

                    competitionName = 'Libertadores'

                    disableResultButton()
                })
            } else {
                throw new Error("Erro ao carregar arquivo JSON:" + response.status);

            }
        }))
    }

    guessContainer.style.display = 'flex'
    gameMask.style.visibility = 'visible'
    generatorBox.style.top = '25%'
    generatorBoxTitle.innerHTML = 'Confronto gerado!'
}

function userChoice(choice) {
    var homeTeamButton = document.getElementById('home-team-button')
    var visitingTeamButton = document.getElementById('visiting-team-button')
    var drawButton = document.getElementById('draw-button')

    if (choice === 'homeTeam') {
        homeTeamButton.classList.add('selected-button')
        visitingTeamButton.classList.remove('selected-button')
        drawButton.classList.remove('selected-button')

        enableResultButton()
    } else if (choice === 'draw') {
        drawButton.classList.add('selected-button')
        homeTeamButton.classList.remove('selected-button')
        visitingTeamButton.classList.remove('selected-button')

        enableResultButton()
    } else {
        visitingTeamButton.classList.add('selected-button')
        homeTeamButton.classList.remove('selected-button')
        drawButton.classList.remove('selected-button')

        enableResultButton()
    }
}

async function generateResult() {
    var homeGoals = Math.floor(Math.random() * 6)
    var visitingGoals = Math.floor(Math.random() * 6)

    var result = ''

    if (homeTeamButton.classList.contains('selected-button') && homeGoals > visitingGoals) {
        generatorBoxTitle.innerHTML = 'Você acertou!'
    } else if (visitingTeamButton.classList.contains('selected-button') && visitingGoals > homeGoals) {
        generatorBoxTitle.innerHTML = 'Você acertou!'
    } else if (drawButton.classList.contains('selected-button') && homeGoals === visitingGoals) {
        generatorBoxTitle.innerHTML = 'Você acertou!'
    } else {
        generatorBoxTitle.innerHTML = 'Você errou!'
    }

    if (homeGoals > visitingGoals) {
        result = homeTeamButton.innerText
    } else if (visitingGoals > homeGoals) {
        result = visitingTeamButton.innerText
    } else {
        result = drawButton.innerText
    }

    homeTeamGoalsSpan.innerHTML = homeGoals
    visitingTeamGoalsSpan.innerHTML = visitingGoals
    hideButton.forEach(button => {
        button.style.display = 'none'
    })
    newClashButton.style.display = 'block'


    const response = await fetch(`/game/ultimaPartida/${userId}`)

    if (response.ok) {
        const data = await response.json()

        // console.log(response.json())

        if (data && data.idPartidaGerada) {
            newMatchId = data.idPartidaGerada + 1
        } else {
            newMatchId = 1
        }
    }

    fetch('/game/partida', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            matchIdServer: newMatchId,
            userIdServer: userId,
            homeTeamNameServer: homeTeamButton.innerText,
            visitingTeamNameServer: visitingTeamButton.innerText,
            competitionServer: competitionName,
            resultServer: result
        })
    }).then(function (response) {
        if (response.ok) {
            console.log('Deu certo!')
        } else {
            throw new Error("Houve um erro ao tentar inserir o resultado no banco");
        }
    }).catch(function (response) {
        console.log(`#ERRO: ${response}`)
    })

    userPrediction()
}

async function userPrediction() {
    var userGuess = ''

    if (homeTeamButton.classList.contains('selected-button')) {
        userGuess = homeTeamButton.innerText
    } else if (visitingTeamButton.classList.contains('selected-button')) {
        userGuess = visitingTeamButton.innerText
    } else {
        userGuess = drawButton.innerText
    }

    const response = await fetch(`/game/ultimoPalpite/${userId}`)
    if (response.ok) {
        const data = await response.json()

        if (data && data.idUsuario) {
            newGuessId = data.idPalpite + 1
        } else {
            newGuessId = 1
        }
    }

    fetch('/game/palpite', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            guessIdServer: newGuessId,
            userIdServer: userId,
            matchIdServer: newMatchId,
            userGuessServer: userGuess
        })
    }).then(function (response) {
        if (response.ok) {
            console.log('Deu certo! Palpite inserido no banco')
        } else {
            throw new Error("Houver um erro ao tentar inserir o palpite no banco");
        }
    }).catch(function (response) {
        console.log(`#ERRO: ${response}`)
    })
}

function generateNewClash() {
    var competitionOptions = document.getElementById('new-clash-button-container')

    competitionOptions.style.display = 'flex'
    newClashButton.style.display = 'none'
}

function disappearMask() {
    gameMask.style.visibility = 'hidden'
    generatorBox.style.top = '-330px'

    initialSettings()
}

function disableResultButton() {
    showResultButton.disabled = true
    showResultButton.classList.add('disabled-button')
}

function enableResultButton() {
    showResultButton.disabled = false
    showResultButton.classList.remove('disabled-button')
}

function initialSettings(situation) {
    var competitionOptions = document.getElementById('new-clash-button-container')

    if (situation === 'newGuess') {
        generatorBoxTitle.innerHTML = 'Novo confronto gerado!'
        guessContainer.style.display = 'flex'
        hideButton.forEach(button => {
            button.style.display = 'block'
        })
    } else {
        generatorBoxTitle.innerHTML = 'Gere o confronto!'
        guessContainer.style.display = 'none'
    }

    homeTeamGoalsSpan.innerHTML = '?'
    visitingTeamGoalsSpan.innerHTML = '?'
    visitingTeamButton.classList.remove('selected-button')
    homeTeamButton.classList.remove('selected-button')
    drawButton.classList.remove('selected-button')
    competitionOptions.style.display = 'none'

    disableResultButton()
}