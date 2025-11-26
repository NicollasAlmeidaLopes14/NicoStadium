function loadTeams() {
    fetch('/data/teams.json')
        .then(function (response) {
            if (response.ok) {
                // console.log(response)

                response.json()
                    .then(data => {
                        console.log(data)

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
                throw new Error('Erro ao carregar arquivo JSON:' + response.status)
            }
        })
}
