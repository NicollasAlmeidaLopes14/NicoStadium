function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var name = name_input.value;
    var email = email_input.value;
    var cpf = cpf_input.value;
    var cellphone = cellphone_input.value;
    var password = password_input.value;
    var passwordConfirmation = confirm_password_input.value;
    var gender = document.getElementsByName('gender_option')

    for (var i = 0; i < gender.length; i++) {

        if (gender[i].checked) {
            var checkedGender = gender[i].value;

            break
        }
    }

    // Verificando se há algum campo em branco
    if (
        name == "" ||
        email == "" ||
        cpf == "" ||
        cellphone == "" ||
        password == "" ||
        passwordConfirmation == "" ||
        gender == ""
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "(Mensagem de erro para todos os campos em branco)";

        finalizarAguardar();
        return false;
    } else {
        setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nameServer: name,
            emailServer: email,
            cpfServer: cpf,
            cellphoneServer: cellphone,
            passwordServer: password,
            genderServer: checkedGender
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

                limparFormulario();
                finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none";
}