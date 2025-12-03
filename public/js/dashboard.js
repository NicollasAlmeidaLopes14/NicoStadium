function loadPage() {
    var userName = sessionStorage.NOME_USUARIO
    var userEmail = sessionStorage.EMAIL_USUARIO

    user_name_span.innerHTML = userName
    user_email_span.innerHTML = userEmail

    userPerformance()
    wrongs()
    rights()
}

function userPerformance() {
    var userId = sessionStorage.ID_USUARIO


    fetch(`/dashboard/aproveitamento/${userId}`).then(function (response) {
        if (response.ok) {
            console.log('Aproveitamento plotado')
            response.json().then(data => {
                console.log(data)

                var userHitHate = data.Aproveitamento

                utilization_rate_span.innerHTML = userHitHate
            })
        } else {
            throw new Error("Erro ao puxar o aproveitamento do banco");
        }
    }).catch(function (response) {
        console.log(`#ERRO: ${response}`)
    })
}


function wrongs() {
    var userId = sessionStorage.ID_USUARIO

    fetch(`/dashboard/palpitesErrados/${userId}`).then(function (response) {
        if (response.ok) {
            console.log('Palpites Errados plotados')
            response.json().then(data => {
                console.log(data)

                var wrongGuess = data.Erros

                wrong_guess_span.innerHTML = wrongGuess
            })
        } else {
            throw new Error("Erro ao puxar palpites errados do banco");

        }
    }).catch(function (response) {
        console.log(`#ERRO: ${response}`)
    })
}

function rights() {
    var userId = sessionStorage.ID_USUARIO

    fetch(`/dashboard/palpitesCertos/${userId}`).then(function (response) {
        if (response.ok) {
            console.log('Palpites Certos plotados')
            response.json().then(data => {
                console.log(data)

                var rightGuess = data.Acertos

                right_guess_span.innerHTML = rightGuess
            })
        } else {
            throw new Error("Erro ao puxar palpites errados do banco");

        }
    }).catch(function (response) {
        console.log(`#ERRO: ${response}`)
    })
}