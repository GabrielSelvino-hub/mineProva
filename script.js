function generateTest() {
    const divQuestions = document.getElementById('questions');
    const resultDiv = document.getElementById('result');
    var contPer = 0;
    document.getElementById('result').innerHTML = '';
    document.getElementById('questions').innerHTML = '';

    const data = document.getElementById('campoTexto').value; // Obtendo o conteúdo do <textarea>

    const questions = data.split('\n');
    const perguntas = [];

    questions.forEach((question, index) => {
        const [questionPart, ...options] = question.split('|');
        const [questionText, answerPart] = questionPart.split('- Resposta:');
        const resposta = answerPart ? answerPart.trim() : '';
        const q = questionText.trim();

        const divQuestion = document.createElement('div');
        divQuestion.innerHTML = `<p>${q}</p>`;
        var cont = 1;
        options.forEach(option => {
            if (option == resposta) {
                divQuestion.innerHTML += `<input type="radio" name="${q}" id="${cont++}" value="${option.trim()}">${option}<br>`;
            } else {
                divQuestion.innerHTML += `<input type="radio" name="${q}" id="${cont++}" value="${option.trim()}">${option}<br>`;
            }
        });
        contPer++
        perguntas.push({ pergunta: q, resposta: resposta });
        divQuestions.appendChild(divQuestion);
    });

    const checkButton = document.createElement('button');
    checkButton.textContent = "Verificar Respostas";
    checkButton.addEventListener('click', () => {
        resultDiv.innerHTML = '';
        const questions = document.querySelectorAll('[id]');
        var contRes = 0;
        questions.forEach(question => {
            var selectedAnswer = document.querySelector(`[name="${question.name}"]:checked`);

            if (selectedAnswer) {
                const questionIndex = perguntas.findIndex(item => item.pergunta === question.name);

                const respostaSelecionada = selectedAnswer.value.trim().toLowerCase();
                const respostaCorreta = perguntas[questionIndex].resposta.toLowerCase();
                if (respostaSelecionada !== respostaCorreta && !selectedAnswer.dataset.checked) {
                    resultDiv.innerHTML += '<br><br>------------------------------------------------------------------<br>';
                    resultDiv.innerHTML += `Respostas Incorretas: ${respostaSelecionada}<br>`;
                    resultDiv.innerHTML += `Pergunta: ${question.name}<br>`;
                    resultDiv.innerHTML += `Resposta Correta: ${respostaCorreta}<br>`;
                    contRes++;
                    selectedAnswer.dataset.checked = true;
                }
            }
        });
        if (contRes == 0) {
            resultDiv.innerHTML = "<br><br>Parabéns! Todas as respostas estão corretas!";
        } else {
            resultDiv.innerHTML += `<br><br>Você errou ${contRes} Perguntas`;
        }
        resultDiv.innerHTML += `<br><br>Você tem ${contPer++} Perguntas`;
    });

    divQuestions.appendChild(checkButton);
}

generateTest();
