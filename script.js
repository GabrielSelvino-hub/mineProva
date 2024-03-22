
function generateTest() {
    const divQuestions = document.getElementById('questions');
    const resultDiv = document.getElementById('result');
    var contPer=0;
    document.getElementById('result').innerHTML = '';
    fetch('questions.txt') // Altere 'questions.txt' para o caminho do seu arquivo de questões
        .then(response => response.text())
        .then(data => {
            const questions = data.split('\n');
            const divQuestions = document.getElementById('questions');

            const perguntas = [];

            questions.forEach((question, index) => {
                const [questionPart, ...options] = question.split('|'); // Separar a parte da pergunta das opções
                const [questionText, answerPart] = questionPart.split('- Resposta:'); // Separar a pergunta e a parte da resposta
                
                const resposta = answerPart ? answerPart.trim() : ''; // Verificar se há uma resposta e removê-la da parte da pergunta
                const q = questionText.trim(); // Remover espaços em branco em torno da pergunta
                
                const divQuestion = document.createElement('div');
                divQuestion.innerHTML = `<p>${q}</p>`;
                var cont = 1;
                options.forEach(option => {
                    if(option == resposta){
                        divQuestion.innerHTML += `<input type="radio" name="${q}" id="${cont++}" value="${option.trim()}">${option}<br>`;
                    }else {
                        divQuestion.innerHTML += `<input type="radio" name="${q}" id="${cont++}" value="${option.trim()}">${option}<br>`;
                    }
                });contPer++
                perguntas.push({ pergunta: q, resposta: resposta }); // Armazenar a pergunta e a resposta na estrutura de dados
                divQuestions.appendChild(divQuestion);
            });            

            // Retornar o array de perguntas e respostas
            return perguntas;
        })
        .then(perguntas => {
            // Código para verificar respostas
            const checkButton = document.createElement('button');
            checkButton.textContent = "Verificar Respostas";
            checkButton.addEventListener('click', () => {
                resultDiv.innerHTML = '';
                const questions = document.querySelectorAll('[id]');
                var contRes=0;
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
                            // Marcando o elemento como verificado
                        }
                    }
                });
                if(contRes == 0) {
                    resultDiv.innerHTML = "<br><br>Parabéns! Todas as respostas estão corretas!";
                } else {
                    resultDiv.innerHTML += `<br><br>Você errou ${contRes} Perguntas`;
                }
                resultDiv.innerHTML += `<br><br>Você tem ${contPer-1} Perguntas`;
            });
            
            divQuestions.appendChild(checkButton);
        });
        
}


generateTest();