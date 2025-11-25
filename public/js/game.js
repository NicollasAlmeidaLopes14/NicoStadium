function loadTeams() {
    fetch('/data/teams.json')
        .then(function (response) {
            if (response.ok) {
                // console.log(response)

                response.json()
                    .then(data => {
                        console.log(data)

                        const championsContainer = document.getElementById('champions-team-container')

                        data[0].champions.forEach(team => {
                            const image = document.createElement('img')
                            image.src = team.logo
                            image.alt = team.name
                            image.id = team.styleId
                            image.classList.add('champions-team-logo')

                            championsContainer.appendChild(image)
                        });
                    })
            } else {
                throw new Error('Erro ao carregar arquivo JSON:' + response.status)
            }
        })
}
