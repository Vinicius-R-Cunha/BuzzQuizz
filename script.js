getQuizzes();

const layout1 = document.querySelector('.layout-1');
const layout2 = document.querySelector('.layout-2');
const layout3 = document.querySelector('.layout-3');

const beginning = document.querySelector('.beginning');
const questions = document.querySelector('.questions');
const levels = document.querySelector('.levels');

const titleInput = document.querySelector('.input-title');
const urlInput = document.querySelector('.input-url');
const questionsQuantity = document.querySelector('.input-questions-quantity');
const levelsQuantity = document.querySelector('.input-levels-quantity');

function getQuizzes() {   
    const quizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    
    quizzes.then(showQuizzes);
}

function showQuizzes(quizzes) {
    const allQuizzes = document.querySelector('.all-quizzes');
    
    allQuizzes.innerHTML = '';
    
    for (let i = 0; i < quizzes.data.length; i++) {
        let id = quizzes.data[i].id;
        let image = quizzes.data[i].image;
        let title = quizzes.data[i].title;
        
        allQuizzes.innerHTML += `
        <div class="quizz" id="${id}" onclick="openQuizz(this)">
        <img class="quizz-img" src=${image}>
        <p class="quizz-name">${title}</p>
        <div class="gradient"></div>
        </div>
        `
    }
}

// volta pra página inicial se clicar na logo la em cima
function reloadPage() {
    window.location.reload();
}

function openQuizz(quizz) {
    // vai para o Layout 2 do quizz clicado

    // id do quizz que foi clicado
    const idQuizz = quizz.id;

    // esconde o layout-1
    layout1.classList.add('hidden');
    // tira o escondido do layout-2
    layout2.classList.remove('hidden');

    const SelectedQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    SelectedQuizz.then(showSelectedQuizz);
}

function comparador() { 
	return Math.random() - 0.5; 
}

function showSelectedQuizz(selectedQuizz) {
    const quizzPromesse = selectedQuizz.data;
    layout2.innerHTML =`
    <div class="banner">
        <img src="${quizzPromesse.image}" alt="">
    </div>
    <div class="banner-title">
        <h1>${quizzPromesse.title}</h1>
    </div>
    `
    const list = [0,1,2,3];
    list.sort(comparador);

    for(let i = 0 ; i < 3 ; i++){
    layout2.innerHTML +=`
    <div class="box-quizz">
        <div class="quizz-title">
            <h1>${quizzPromesse.questions[i].title}</h1>
        </div>
        <div class="options-quizz">
            
            <div class="option">
                <img src="${quizzPromesse.questions[i].answers[list[0]].image}"> 
                <p>${quizzPromesse.questions[i].answers[list[0]].text}</p>       
            </div>

            <div class="option">
                <img src="${quizzPromesse.questions[i].answers[list[1]].image}">  
                <p>${quizzPromesse.questions[i].answers[list[1]].text}</p>
            </div>

            <div class="option">
                <img src="${quizzPromesse.questions[i].answers[list[2]].image}">
                <p>${quizzPromesse.questions[i].answers[list[2]].text}</p>
            </div>

            <div class="option">
                <img src="${quizzPromesse.questions[i].answers[list[3]].image}">
                <p>${quizzPromesse.questions[i].answers[list[3]].text}</p>
            </div>

        </div>
    </div>
    `
    }
}


function createQuizz() {   
    layout1.classList.add('hidden');
    layout3.classList.remove('hidden');
}

function continueToQuestions() {
    
    let validTitle = false;
    let validUrl = false;
    let validQuestionNumber = false;
    let validLevelNumber = false;

    if (titleInput.value.length >= 20 && titleInput.value.length <= 65 && titleInput.value !== '') {
        validTitle = true;
    } else {
        // Título errado
    }

    if (questionsQuantity.value % 1 === 0 && questionsQuantity.value >= 3 && parseInt(questionsQuantity.value) !== NaN) {
        validQuestionNumber = true;
    } else {
        // Quantidade de perguntas errada
    }

    if (levelsQuantity.value % 1 === 0 && levelsQuantity.value >= 2 && parseInt(levelsQuantity.value) !== NaN) {
        validLevelNumber = true;
    } else {
        // Quantidade de níveis errado
    }


    if (validTitle && validQuestionNumber && validLevelNumber) {
        beginning.classList.add('hidden');
        questions.classList.remove('hidden');
        // printa a quantidade de perguntas que precisa a partir da 2;
        showQuestions(parseInt(questionsQuantity.value));
    } else {
        alert("Bobeou amigão");
    }

}

function showQuestions(num) {

    for (let i = 2; i < (num+1); i++) {
        questions.innerHTML += `
            <div class="inputs-div question-${i}">

                <div class="minimize sub-sub-title" onclick="maximizeQuestion(this)">
                    <p>Pergunta ${i}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>


                <div class="closed hidden">
                    <div class="question sub-sub-title"><p>Pergunta ${i}</p>
                        <input class="question-title" placeholder="Texto da pergunta" type="text">
                        <input class="color" placeholder="Cor de fundo da pergunta" type="text">
                    </div>

                    <div class="correct-answer sub-sub-title"><p>Resposta correta</p>
                        <input class="answer" placeholder="Resposta correta" type="text">
                        <input class="url" placeholder="URL da imagem" type="text">
                    </div>

                    <div class="incorrect-answers sub-sub-title"><p>Respostas incorretas</p>
                        <input class="answer" placeholder="Resposta incorreta 1" type="text">
                        <input class="url" placeholder="URL da imagem 1" type="text">

                        <input class="answer" placeholder="Resposta incorreta 2" type="text">
                        <input class="url" placeholder="URL da imagem 2" type="text">

                        <input class="answer" placeholder="Resposta incorreta 3" type="text">
                        <input class="url" placeholder="URL da imagem 3" type="text">
                    </div>
                </div>

            </div>
        `

    }
    questions.innerHTML += `
        <div class="continue-to-levels" onclick="continueToLevels()">
            <p>Prosseguir para criar níveis</p>
        </div>
    `
}

function maximizeQuestion(question) {

    // encontro quem está aberto dentro de questions e fecho
    const openQuestion = questions.querySelector('.open');
    openQuestion.classList.add('closed');
    openQuestion.classList.add('hidden');
    openQuestion.classList.remove('open');

    // encontro o irmão minimize que está hidden e tiro o hidden
    const minimize = openQuestion.parentNode.querySelector('.minimize');
    minimize.classList.remove('hidden');

    // coloco hidden no elemento minimize que foi clicado
    question.classList.add('hidden');

    // encontro o irmão closed que está hidden, tiro ambas as classes e coloco open
    const closedDiv = question.parentNode.querySelector('.closed');
    closedDiv.classList.remove('closed');
    closedDiv.classList.remove('hidden');
    closedDiv.classList.add('open');
}


let answersArray = [];
let questionsArray = [];

function continueToLevels() {

    const allTitlesSelected = document.querySelectorAll('.questions .question-title');
    const allColorsSelected = document.querySelectorAll('.questions .color');
    const allAnswersSelected = document.querySelectorAll('.questions .answer');
    const allUrlSelected = document.querySelectorAll('.questions .url');
    
    answersArray = [];
    questionsArray = [];
    // organiza a lista de answers em blocos de 4
    for (let i = 0; i < allTitlesSelected.length; i++) {
        answersArray.push([{text:allAnswersSelected[4*i].value ,image:allUrlSelected[4*i].value, isCorrectAnswer: true},
                        {text:allAnswersSelected[4*i+1].value, image:allUrlSelected[4*i+1].value, isCorrectAnswer: false},
                        {text:allAnswersSelected[4*i+2].value, image:allUrlSelected[4*i+2].value, isCorrectAnswer: false},
                        {text:allAnswersSelected[4*i+3].value, image:allUrlSelected[4*i+3].value, isCorrectAnswer: false}]);
    }

    // monta a lista de questions que será enviada pelo post
    for (let i = 0; i < allTitlesSelected.length; i++) {
        questionsArray.push({title:allTitlesSelected[i].value, color:allColorsSelected[i].value , answers:answersArray[i]});
    }

    console.log(answersArray);
    console.log(questionsArray);

    
    // só continua se as perguntas estiver OK (filterData retorna True)
    // if (filterData()) { 
    //     questions.classList.add('hidden');
    //     levels.classList.remove('hidden');
    // }

    filterData();
    // questions.classList.add('hidden');
    // levels.classList.remove('hidden');
}

function filterData() {
    
    // texto da pergunta != vazio e mais de 20 characteres
    for (let i = 0; i < questionsArray.length; i++) {
        if (questionsArray[i].title.length <= 20 || questionsArray[i].title === '') {
            // alert(`Texto da Pergunta ${i+1} errado`);
            // return false;
        }
    }

    // cor de fundo != vazio #...
    for (let i = 0; i < questionsArray.length; i++) {
        if (isHexadecimal(questionsArray[i].color) === false) {
            // alert(`Color da Pergunda ${i+1} errada`);
            // return false;
        }
    }

    // as duas primeiras respostas não podem estar vazias, entao acesso todos os arrays i j
    for (let i = 0; i < answersArray.length; i++) {
        for (let j = 0; j < 2; j++) {
            if (answersArray[i][j].text === '' || answersArray[i][j].image === '') {
                alert(`Preencha as respostas`);
                return false;
            }
        }
    }

    // verificacao de URL


    return true;

}



function isHexadecimal(string) {

    string = string.toLowerCase();

    // recebe uma string e verifica se o primeiro caracter é # e se cada letra está entre A e F
    const aToF = ['a','b','c','d','e','f','0','1','2','3','4','5','6','7','8','9'];

    if (string.length !== 7) {
        return false
    }

    if (string[0] !== '#') {
        return false;
    }

    for (let i = 1; i < string.length ; i++) {
        let isDifferent = true;
        for (let j = 0; j < aToF.length; j++) {
            if (string[i] === aToF[j]) {
                isDifferent = false;
            }
        }
        if (isDifferent) {
            return false;
        }
    }
    return true
}
