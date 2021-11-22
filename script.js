getQuizzes();

const layout1 = document.querySelector('.layout-1');
const layout2 = document.querySelector('.layout-2');
const layout3 = document.querySelector('.layout-3');

const beginning = document.querySelector('.beginning');
const questions = document.querySelector('.questions');
const levels = document.querySelector('.levels');
const ending = document.querySelector('.ending');

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
    // id do quizz que foi clicado
    const idQuizz = quizz.id;

    const SelectedQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    const testee = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    SelectedQuizz.then(showSelectedQuizz);
}

function comparador() { 
	return Math.random() - 0.5; 
}

let cont = 0;
let contTrue = 0;
function selectAnswersQuizz(selectedAnswer){
    cont ++;
    if(selectedAnswer.classList.value === "option true"){
        contTrue = contTrue + 100;
    }
    const selectedBox = selectedAnswer.parentNode.parentNode;
    selectedAnswer.classList.add("selected-answer");
    let unselected = selectedBox.querySelectorAll(".option");

    for(let i = 0 ; i < 4 ; i++){
        unselected[i].classList.add("unselected");
    }

    selectedAnswer.classList.remove("unselected");

    setTimeout(scrollPage, 2100);

    if(cont === howManyQuizz){
        setTimeout(resultQuizz, 2000);
    }
}
function scrollPage(){
    const result = document.querySelector(".result-quizz");
    const question = document.querySelectorAll('.box-quizz');
    if(cont < howManyQuizz){
        question[cont].scrollIntoView();
        console.log("aaaaa")
    }
    else{
        console.log(result);
        result.scrollIntoView();
    }
}

let howManyQuizz;
let abcdefgh;
let quizzPromise;
function showSelectedQuizz(selectedQuizz) {
    // vai para o Layout 2 do quizz clicado
    // esconde o layout-1
    layout1.classList.add('hidden');
    // tira o escondido do layout-2
    layout2.classList.remove('hidden');
    scrollUp.scrollIntoView();
    abcdefgh = selectedQuizz;

    quizzPromise = selectedQuizz.data;
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

            <div class="option ${quizzPromise.questions[0].answers[list[0]].isCorrectAnswer}"  onclick="selectAnswersQuizz(this)">
                <img src="${quizzPromise.questions[i].answers[list[0]].image}"> 
                <p>${quizzPromise.questions[i].answers[list[0]].text}</p>       
            </div>
            
            <div class="option ${quizzPromise.questions[0].answers[list[1]].isCorrectAnswer}" onclick="selectAnswersQuizz(this)">
                <img src="${quizzPromise.questions[i].answers[list[1]].image}">  
                <p>${quizzPromise.questions[i].answers[list[1]].text}</p>
            </div>

            <div class="option ${quizzPromise.questions[0].answers[list[2]].isCorrectAnswer}" onclick="selectAnswersQuizz(this)">
                <img src="${quizzPromise.questions[i].answers[list[2]].image}">
                <p>${quizzPromise.questions[i].answers[list[2]].text}</p>
            </div>

            <div class="option ${quizzPromise.questions[0].answers[list[3]].isCorrectAnswer}" onclick="selectAnswersQuizz(this)">
                <img src="${quizzPromise.questions[i].answers[list[3]].image}">
                <p>${quizzPromise.questions[i].answers[list[3]].text}</p>
            </div>

        </div>
    </div>
    `
    }
}

function resultQuizz(){
    const x = contTrue/howManyQuizz;
    const percentage = Math.floor(x);
    for(let i = levelsQuantity.value; i  > 0 ; i--){
        if(percentage >= quizzPromise.levels[i-1].minValue){
            layout2.innerHTML +=`
            <div class="box-quizz result-quizz">
                <div class="quizz-title">
                    <h1>${percentage}% de acerto: ${quizzPromise.levels[i-1].title}</h1>
                </div>
                <div class="result">
                    <img src="${quizzPromise.levels[i-1].image}" alt="">
                    <P>${quizzPromise.levels[i-1].text}</P>
                </div class="buttons-settings">
                    <button class="button-reload" onclick="reloadQuizz(this)">Reiniciar Quizz</button>
                    <button class="button-home" onclick="returnLayout1()(this)">Voltar pra home</button>
                </div>
            `
            break;
        }
    }
}
    const scrollUp = document.querySelector(".layout-2");

    function reloadQuizz(){
        layout2.innerHTML =" ";
        showSelectedQuizz(abcdefgh);
        cont = 0;
        contTrue = 0;
    }


// function reloadQuizz(reload){
//     const removeSelectedAnswer = document.querySelectorAll(".selected-answer");
//     const removeUnselected = document.querySelectorAll(".unselected");
//     const messageResultQuizz = document.querySelector(".result-quizz");

//     for(let i = 0; i < howManyQuizz; i++){
//         removeSelectedAnswer[i].classList.remove("selected-answer");
//     }
//     for(let i = 0; i < (howManyQuizz * 3); i++){
//         removeUnselected[i].classList.remove("unselected");
//     }
//     scrollUp.scrollIntoView();
//     //messageResultQuizz.classList.add("hidden");
//     cont = 0;
//     contTrue = 0;
// }

function returnLayout1(){
    reloadQuizz();
    layout2.classList.add('hidden');
    layout1.classList.remove('hidden');
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

    // verificacao de URL

    if (questionsQuantity.value % 1 === 0 && questionsQuantity.value >= 3 && isNaN(parseInt(questionsQuantity.value)) === false) {
        validQuestionNumber = true;
    } else {
        // Quantidade de perguntas errada
    }

    if (levelsQuantity.value % 1 === 0 && levelsQuantity.value >= 2 && isNaN(parseInt(levelsQuantity.value)) === false) {
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
            <div class="inputs-div">

                <div class="minimize sub-sub-title" onclick="maximizeQuestion(this)">
                    <p>Pergunta ${i}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>


                <div class="closed hidden">
                    <div class="question sub-sub-title"><p>Pergunta ${i}</p>
                        <input class="question-title" placeholder="Texto da pergunta" type="text" value="aaaaaaaaaaaaaaaaaaaa">
                        <input class="color" placeholder="Cor de fundo da pergunta" type="text" value="#123456">
                    </div>

                    <div class="correct-answer sub-sub-title"><p>Resposta correta</p>
                        <input class="answer" placeholder="Resposta correta" type="text" value="repostinhaaaaaaaaaaaaaaaa">
                        <input class="url" placeholder="URL da imagem" type="text" value="https://http.cat/411.jpg">
                    </div>

                    <div class="incorrect-answers sub-sub-title"><p>Respostas incorretas</p>
                        <input class="answer" placeholder="Resposta incorreta 1" type="text" value="repostinhaaaaaaaaaaaaaaaa">
                        <input class="url" placeholder="URL da imagem 1" type="text" value="https://http.cat/411.jpg">

                        <input class="answer" placeholder="Resposta incorreta 2" type="text" value="repostinhaaaaaaaaaaaaaaaa">
                        <input class="url" placeholder="URL da imagem 2" type="text" value="https://http.cat/411.jpg">

                        <input class="answer" placeholder="Resposta incorreta 3" type="text" value="repostinhaaaaaaaaaaaaaaaa">
                        <input class="url" placeholder="URL da imagem 3" type="text" value="https://http.cat/411.jpg">
                    </div>
                </div>

            </div>
        `

    }
    questions.innerHTML += `
        <div class="continue-button continue-to-levels" onclick="continueToLevels()">
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
let levelsArray = [];

function continueToLevels() {
    // só continua se as perguntas estiver OK (filterQuestions retorna True)
    if (filterQuestions()) { 
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
        // removo as answers que nao tem texto ou imagem antes de colocar no questions
        for (let i = 0; i < allTitlesSelected.length; i++) {
            let arrayIJ = [];
            for (let j = 0; j < answersArray[i].length; j++) {
                if (answersArray[i][j].text !== '' && answersArray[i][j].image !== '') {
                    arrayIJ.push(answersArray[i][j]);
                }
            }
            
            questionsArray.push({title:allTitlesSelected[i].value, color:allColorsSelected[i].value , answers:arrayIJ});
        }
    
        questions.classList.add('hidden');
        levels.classList.remove('hidden');
        showLevels(parseInt(levelsQuantity.value));
    }
}

function filterQuestions() {
    
    // texto da pergunta != vazio e mais de 20 characteres
    for (let i = 0; i < questionsArray.length; i++) {
        if (questionsArray[i].title.length < 20 || questionsArray[i].title === '') {
            alert(`Texto da Pergunta ${i+1} errado`);
            return false;
        }
    }

    // cor de fundo != vazio #...
    for (let i = 0; i < questionsArray.length; i++) {
        if (isHexadecimal(questionsArray[i].color) === false) {
            alert(`Color da Pergunda ${i+1} errada`);
            return false;
        }
    }

    // as duas primeiras respostas não podem estar vazias, entao acesso todos os arrays i j
    for (let i = 0; i < answersArray.length; i++) {
        for (let j = 0; j < 2; j++) {
            if (answersArray[i][j].text === '' || answersArray[i][j].image === '') {
                if (j === 0) {
                    alert(`Preencha a resposta certa`);
                } else {
                    alert(`Preencha pelo menos a primeira resposta errada`)
                }
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

function showLevels(num) {
    for (let i = 2; i < (num+1); i++) {
        levels.innerHTML += `
            <div class="inputs-div">

                <div class="minimize sub-sub-title" onclick="maximizeLevel(this)">
                    <p>Nível ${i}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>
                
                <div class="closed hidden">
                    <div class="level-info sub-sub-title"><p>Nível ${i}</p>
                        <input class="level-title" placeholder="Título do nível" type="text" value="aaaaaaaaaa">
                        <input class="percentage" placeholder="% de acerto mínima" type="text" value="0">
                        <input class="level-url" placeholder="URL da imagem do nível" type="text" value="https://http.cat/412.jpg">
                        <input class="level-description" placeholder="Descrição do nível" type="text" value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">
                    </div>
                </div>

            </div>
        `
    }

    levels.innerHTML += `
        <div class="continue-button finish-quizz" onclick="finishQuizz()">
            <p>Finalizar Quizz</p>
        </div>
    `
}

function maximizeLevel(level) {

    // encontro quem está aberto dentro de questions e fecho
    const openLevel = levels.querySelector('.open');
    openLevel.classList.add('closed');
    openLevel.classList.add('hidden');
    openLevel.classList.remove('open');

    // encontro o irmão minimize que está hidden e tiro o hidden
    const minimize = openLevel.parentNode.querySelector('.minimize');
    minimize.classList.remove('hidden');

    // coloco hidden no elemento minimize que foi clicado
    level.classList.add('hidden');

    // encontro o irmão closed que está hidden, tiro ambas as classes e coloco open
    const closedDiv = level.parentNode.querySelector('.closed');
    closedDiv.classList.remove('closed');
    closedDiv.classList.remove('hidden');
    closedDiv.classList.add('open');
}


function finishQuizz() {
    // se tiver tudo OK na aba Levels
    if (filterLevels()) {
        
        levelsArray = [];
        const allLevelsTitles = document.querySelectorAll('.levels .level-title');
        const allLevelsPercentages = document.querySelectorAll('.levels .percentage');
        const allLevelsUrl = document.querySelectorAll('.levels .level-url');
        const allLevelsDescriptions = document.querySelectorAll('.levels .level-description');

        for (let i = 0; i < allLevelsTitles.length; i++) {
            levelsArray.push({title:allLevelsTitles[i].value,image:allLevelsUrl[i].value,text:allLevelsDescriptions[i].value,minValue:parseInt(allLevelsPercentages[i].value)})
        }

        const completedQuizz = {title:titleInput.value,image:urlInput.value,questions:questionsArray, levels:levelsArray}

        const sendToServer = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',completedQuizz);
        sendToServer.then(goToFinalCreationPage);

    }
}

function goToFinalCreationPage(createdQuizz) {
       
    //armezeno o createdQuizz no localStorage identificado pelo ID
    const stringFormOfCreatedQuizz = JSON.stringify(createdQuizz.data); 
    localStorage.setItem(`${createdQuizz.data.id}`,stringFormOfCreatedQuizz);

    if (createdQuizz !== undefined) {
        ending.innerHTML = `
                <p class="sub-title">Seu quizz está pronto!</p>

                <div class="created-quizz" onclick="accessCreatedQuizz()">
                    <img class="quizz-img" src=${createdQuizz.data.image}>
                    <p class="quizz-name">${createdQuizz.data.title}</p>
                    <div class="gradient"></div>
                </div>

                <div class="continue-button access-quizz-button" onclick="accessCreatedQuizz()">
                    <p>Acessar Quizz</p>
                </div>

                <p class="back-to-beginning" onclick="reloadPage()">Voltar pra home</p>
            `;
    }
    
    levels.classList.add('hidden');
    ending.classList.remove('hidden');
}

function accessCreatedQuizz() {

    ending.classList.add('hidden')

    const normalFormOfStringify = JSON.parse(localStorage.getItem("userQuizz"));
    console.log(normalFormOfStringify);
    const teste = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${normalFormOfStringify.id}`);
    teste.then(showSelectedQuizz);
    
}

function filterLevels() {
        
    const levelTitlesSelected = document.querySelectorAll('.levels .level-title');
    const levelPercentages = document.querySelectorAll('.levels .percentage');
    const levelUrlSelected = document.querySelectorAll('.levels .level-url');
    const levelDescriptionSelected = document.querySelectorAll('.levels .level-description');

    // titulo do nivel min 10 caracteres 
    for (let i = 0; i < levelTitlesSelected.length; i++) {
        if (levelTitlesSelected[i].value.length < 10) {
            alert(`Título ${i+1} muito curto`);
            return false;
        }
    }

    // % entre 0 e 100
    for (let i = 0; i < levelPercentages.length; i++) {
        if (levelPercentages[i].value % 1 !== 0 || levelPercentages[i].value < 0 || levelPercentages[i].value > 100 || isNaN(parseInt(levelPercentages[i].value)) ) {
            alert(`Porcentagem ${i+1} no formato errado`);
            return false;
        }
    }

    // verificacao de URL


    // descricao do nivel min 30 caracteres
    for (let i = 0; i < levelDescriptionSelected.length; i++) {
        if (levelDescriptionSelected[i].value.length < 30) {
            alert(`Descrição ${i+1} muito curta`);
            return false;
        }

    }

    // pelo menos uma porcentagem de acerto seja 0
    let isZero = false;
    for (let i = 0; i < levelPercentages.length; i++) {
        if (parseInt(levelPercentages[i].value) === 0) {
            isZero = true;
        }
    }

    if (!isZero) {
        alert("Pelo menos uma porcentagem tem que ser 0");
        return false;
    }

    return true;
}









