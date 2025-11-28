
const generateClashChampionsButton = document.getElementById('clash-button-champions')
const generateClashLibertadoresButton = document.getElementById('clash-button-libertadores')
const showResultButton = document.getElementById('show-result-button')
const gameMask = document.getElementById('mask')
const generatorBox = document.getElementById('generator-box')


function loadTeams() {
    fetch('/data/teams.json').then(function (response) {
        if (response.ok) {
            response.json().then(data => {
                const championsContainer = document.getElementById('champions-team-container')
                const libertadoresContainer = document.getElementById('libertadores-teams-container')

                data[0].champions.forEach(championsTeam => {
                    const championsTeamImage = document.createElement('img')
                    championsTeamImage.src = championsTeam.logo
                    championsTeamImage.alt = championsTeam.name
                    championsTeamImage.id = championsTeam.styleId
                    championsTeamImage.classList.add('champions-team-logo')

                    championsContainer.appendChild(championsTeamImage)
                });

                data[1].libertadores.forEach(libertadoresTeam => {
                    const libertadoresTeamImage = document.createElement('img')
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
    const homeTeamLogo = document.getElementById('home-team-logo')
    const visitingTeamLogo = document.getElementById('visiting-team-logo')
    const homeTeamButton = document.getElementById('home-team-button')
    const visitingTeamButton = document.getElementById('visiting-team-button')

    const firstRandomTeam = Math.floor(Math.random() * 10)
    const secondRandomTeam = Math.floor(Math.random() * 9)

    if (competition === 'champions') {
        fetch('/data/teams.json').then((response) => {
            if (response.ok) {
                response.json().then(data => {

                    const homeTeam = data[0].champions[firstRandomTeam]

                    const newData = data[0].champions.filter(updatedData => {
                        return updatedData != homeTeam
                    })

                    const visitingTeam = newData[secondRandomTeam]

                    homeTeamLogo.src = homeTeam.logo
                    homeTeamButton.innerText = homeTeam.nickName

                    visitingTeamLogo.src = visitingTeam.logo
                    visitingTeamButton.innerText = visitingTeam.nickName

                    disableResultButton()
                })
            } else {
                console.log("Erro no fetch da função generateClash")
                throw new Error("Erro ao carregar arquivo JSON" + response.status)
            }
        })

        gameMask.style.visibility = 'visible'
        generatorBox.style.top = '25%'


    } else {
        fetch('/data/teams.json').then((response => {
            if (response.ok) {
                response.json().then(data => {
                    const homeTeam = data[1].libertadores[firstRandomTeam]

                    const newData = data[1].libertadores.filter(updatedData => {
                        return updatedData != homeTeam
                    })

                    console.log(newData)

                    const visitingTeam = newData[secondRandomTeam]

                    homeTeamLogo.src = homeTeam.logo
                    homeTeamButton.innerText = homeTeam.name

                    visitingTeamLogo.src = visitingTeam.logo
                    visitingTeamButton.innerText = visitingTeam.name

                    disableResultButton()
                })
            } else {
                throw new Error("Erro ao carregar arquivo JSON:" + response.status);

            }
        }))

        gameMask.style.visibility = 'visible'
        generatorBox.style.top = '25%'
    }
}

function disappearMask() {
    gameMask.style.visibility = 'hidden'
    generatorBox.style.top = '-330px'
}

function disableResultButton() {
    showResultButton.disabled = true
    showResultButton.style.background = '#d3d3d3'
    showResultButton.style.cursor = 'not-allowed'
}