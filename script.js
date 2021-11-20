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
    // console.log(quizzes.data);
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

    let cont = 0;
function selectAnswersQuizz(selectedAnswer){
    cont ++;
    const selectedBox = selectedAnswer.parentNode.parentNode;
    selectedAnswer.classList.add("selected-answer");

    let unselected = selectedBox.querySelectorAll(".option");

    for(let i = 0 ; i < 4 ; i++){
        unselected[i].classList.add("unselected");
    }

    selectedAnswer.classList.remove("unselected");

    setInterval(scrollPage, 2000);
}

    function scrollPage(){
        let question = document.querySelectorAll('.box-quizz');
        question[cont].scrollIntoView();
    }

let howManyQuizz;

function showSelectedQuizz(selectedQuizz) {
    const quizzPromise = selectedQuizz.data;
    howManyQuizz = quizzPromise.questions.length;
    layout2.innerHTML =`
    <div class="banner">
        <img src="${quizzPromise.image}" alt="">
    </div>
    <div class="banner-title">
        <h1>${quizzPromise.title}</h1>
    </div>
    `
    const list = [0,1,2,3];
    list.sort(comparador);

    for(let i = 0 ; i < howManyQuizz ; i++){
    layout2.innerHTML +=`
    <div class="box-quizz question${i+1}">
        <div class="quizz-title">
            <h1>${quizzPromise.questions[i].title}</h1>
        </div>
        <div class="options-quizz">
            
            <div class="option"  onclick="selectAnswersQuizz(this)">
                <img src="${quizzPromise.questions[i].answers[list[0]].image}"> 
                <p>${quizzPromise.questions[i].answers[list[0]].text}</p>       
            </div>
            
            <div class="option" onclick="selectAnswersQuizz(this)">
                <img src="${quizzPromise.questions[i].answers[list[1]].image}">  
                <p>${quizzPromise.questions[i].answers[list[1]].text}</p>
            </div>

            <div class="option" onclick="selectAnswersQuizz(this)">
                <img src="${quizzPromise.questions[i].answers[list[2]].image}">
                <p>${quizzPromise.questions[i].answers[list[2]].text}</p>
            </div>

            <div class="option" onclick="selectAnswersQuizz(this)">
                <img src="${quizzPromise.questions[i].answers[list[3]].image}">
                <p>${quizzPromise.questions[i].answers[list[3]].text}</p>
            </div>

        </div>
    </div>
    `
    }
    console.log(selectedQuizz);
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

    if (titleInput.value.length >= 20 && titleInput.value.length <= 65) {
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
    } else {
        alert("Bobeou amigão");
    }

    // printa a quantidade de perguntas que precisa a partir da 2;
    showQuestions(parseInt(questionsQuantity.value));
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
                        <input class="input-question margin-top-14" placeholder="Texto da pergunta" type="text">
                        <input class="color-input margin-top-14" placeholder="Cor de fundo da pergunta" type="text">
                    </div>

                    <div class="correct-answer sub-sub-title"><p>Resposta correta</p>
                        <input class="input-question margin-top-14" placeholder="Resposta correta" type="text">
                        <input class="color-input margin-top-14" placeholder="URL da imagem" type="text">
                    </div>

                    <div class="incorrect-answers sub-sub-title"><p>Respostas incorretas</p>
                        <input class="input-question margin-top-14" placeholder="Resposta incorreta 1" type="text">
                        <input class="color-input margin-top-14 margin-bottom" placeholder="URL da imagem 1" type="text">

                        <input class="input-question margin-top-14" placeholder="Resposta incorreta 2" type="text">
                        <input class="color-input margin-top-14 margin-bottom" placeholder="URL da imagem 2" type="text">

                        <input class="input-question margin-top-14" placeholder="Resposta incorreta 3" type="text">
                        <input class="color-input margin-top-14" placeholder="URL da imagem 3" type="text">
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


function continueToLevels() {





    // só continua se as perguntas estiver OK
    questions.classList.add('hidden');
    levels.classList.remove('hidden');
}




