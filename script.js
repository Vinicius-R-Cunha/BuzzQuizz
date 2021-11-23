getQuizzes();

const loading = document.querySelector('.loading');
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

let quizzPromise;
let howManyQuizz;
let reloadedQuizz;

let cont = 0;
let cont2 = 0
let contTrue = 0;

function comparador() { 
	return Math.random() - 0.5; 
}

function getQuizzes() {   
    const quizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    
    quizzes.then(showQuizzes);
}

function showQuizzes(quizzes) {

    layout1.classList.remove('hidden');
    loading.classList.add('hidden');

    const yourQuizzes = document.querySelector('.your-quizzes');
    const yourQuizzesTab = document.querySelector('.your-quizzes-tab');
    const youtQuizzesTitle = document.querySelector('.your-quizzes-title');
    const allQuizzes = document.querySelector('.all-quizzes');
 

    allQuizzes.innerHTML = '';
    
    for (let i = 0; i < quizzes.data.length; i++) {
        let id = quizzes.data[i].id;
        let image = quizzes.data[i].image;
        let title = quizzes.data[i].title;
        if (localStorage.getItem(`${id}`) === null) {
            allQuizzes.innerHTML += `
            <div class="quizz" id="${id}" data-identifier="quizz-card" onclick="openQuizz(this)">
                <img class="quizz-img" src=${image}>
                <p class="quizz-name">${title}</p>
                <div class="gradient"></div>
            </div>
            `
        } else {
            yourQuizzes.classList.add('hidden');
            youtQuizzesTitle.classList.remove('hidden');

            yourQuizzesTab.innerHTML += `
                <div class="your-quizz" id="${id}" data-identifier="quizz-card" onclick="openQuizz(this)">
                    <img src=${image}>
                    <p class="quizz-name">${title}</p>
                    <div class="gradient"></div>
                    <div class="delete-button">
                        <ion-icon name="create-outline"></ion-icon>
                        <ion-icon name="trash-outline" onclick="deleteQuizz(this)"></ion-icon>
                    </div>
                </div>
            `
        }
    }
}

// goes back to initial page by clicking logo
function reloadPage() {
    window.location.reload();
}

function openQuizz(quizz) {
    // clicked quizz id
    const idQuizz = quizz.id;

    const selectedQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    selectedQuizz.then(showSelectedQuizz);

    layout1.classList.add('hidden');
    loading.classList.remove('hidden');
}

function selectAnswersQuizz(selectedAnswer){
    cont ++;

    if(selectedAnswer.classList.value === "option true"){
        contTrue = contTrue + 100;
    }

    const selectedBox = selectedAnswer.parentNode.parentNode;
    let unselected = selectedBox.querySelectorAll(".option");
    selectedBox.classList.add("color-answer");
    let i

    for(let j = 0 ; j < quizzPromise.questions[cont2].answers.length; j++){
        unselected[j].classList.add("unselected");
    }
    cont2 ++;

    selectedAnswer.classList.remove("unselected");

    setTimeout(scrollPage, 2001);

    if(cont === howManyQuizz){
        setTimeout(resultQuizz, 2000);
    }
}
function scrollPage(){
    const result = document.querySelector(".result-quizz");
    const question = document.querySelectorAll('.box-quizz');
    if(cont < howManyQuizz){
        question[cont].scrollIntoView({behavior:"smooth",block:"center"});
    }
    else{
        result.scrollIntoView({behavior:"smooth",block:"center"});
    }
}

function delayQuizzOpening() {
    loading.classList.add('hidden');
    layout2.classList.remove('hidden');
}

function showSelectedQuizz(selectedQuizz) {
    layout1.classList.add('hidden');
    
    setTimeout(delayQuizzOpening,200);

    scrollUp.scrollIntoView({behavior:"smooth",block:"center"});
    reloadedQuizz = selectedQuizz;

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

    const list2 = [0,1,2];

    const list3 = [0,1];

    list.sort(comparador);
    list2.sort(comparador);
    list3.sort(comparador);

    for(let i = 0 ; i < howManyQuizz ; i++){
        if(quizzPromise.questions[i].answers.length === 4){
            layout2.innerHTML +=`
            <div class="box-quizz question${i+1} data-identifier="question"">
                <div class="quizz-title">
                    <h1>${quizzPromise.questions[i].title}</h1>
                </div>
                <div class="options-quizz">

                    <div class="option ${quizzPromise.questions[i].answers[list[0]].isCorrectAnswer}"  data-identifier="answer" onclick="selectAnswersQuizz(this)">
                        <img src="${quizzPromise.questions[i].answers[list[0]].image}"> 
                        <p>${quizzPromise.questions[i].answers[list[0]].text}</p>       
                    </div>
                    
                    <div class="option ${quizzPromise.questions[i].answers[list[1]].isCorrectAnswer}" data-identifier="answer" onclick="selectAnswersQuizz(this)">
                        <img src="${quizzPromise.questions[i].answers[list[1]].image}">  
                        <p>${quizzPromise.questions[i].answers[list[1]].text}</p>
                    </div>

                    <div class="option ${quizzPromise.questions[i].answers[list[2]].isCorrectAnswer}" data-identifier="answer" onclick="selectAnswersQuizz(this)">
                        <img src="${quizzPromise.questions[i].answers[list[2]].image}">
                        <p>${quizzPromise.questions[i].answers[list[2]].text}</p>
                    </div>

                    <div class="option ${quizzPromise.questions[i].answers[list[3]].isCorrectAnswer}" data-identifier="answer" onclick="selectAnswersQuizz(this)">
                        <img src="${quizzPromise.questions[i].answers[list[3]].image}">
                        <p>${quizzPromise.questions[i].answers[list[3]].text}</p>
                    </div>

                </div>
            </div>
            `
        }

        if(quizzPromise.questions[i].answers.length === 3){
            layout2.innerHTML +=`
            <div class="box-quizz question${i+1}" data-identifier="question">
                <div class="quizz-title">
                    <h1>${quizzPromise.questions[i].title}</h1>
                </div>
                <div class="options-quizz">

                    <div class="option ${quizzPromise.questions[i].answers[list2[0]].isCorrectAnswer}" data-identifier="answer" onclick="selectAnswersQuizz(this)">
                        <img src="${quizzPromise.questions[i].answers[list2[0]].image}"> 
                        <p>${quizzPromise.questions[i].answers[list2[0]].text}</p>       
                    </div>
                    
                    <div class="option ${quizzPromise.questions[i].answers[list2[1]].isCorrectAnswer}" data-identifier="answer" onclick="selectAnswersQuizz(this)">
                        <img src="${quizzPromise.questions[i].answers[list2[1]].image}">  
                        <p>${quizzPromise.questions[i].answers[list2[1]].text}</p>
                    </div>

                    <div class="option ${quizzPromise.questions[i].answers[list2[2]].isCorrectAnswer}" data-identifier="answer" onclick="selectAnswersQuizz(this)">
                        <img src="${quizzPromise.questions[i].answers[list2[2]].image}">
                        <p>${quizzPromise.questions[i].answers[list2[2]].text}</p>
                    </div>

                </div>
            </div>
            `
        }

        if(quizzPromise.questions[i].answers.length === 2){
            layout2.innerHTML +=`
            <div class="box-quizz question${i+1}" data-identifier="question">
                <div class="quizz-title">
                    <h1>${quizzPromise.questions[i].title}</h1>
                </div>
                <div class="options-quizz">

                    <div class="option ${quizzPromise.questions[i].answers[list3[0]].isCorrectAnswer}" data-identifier="answer" onclick="selectAnswersQuizz(this)">
                        <img src="${quizzPromise.questions[i].answers[list3[0]].image}"> 
                        <p>${quizzPromise.questions[i].answers[list3[0]].text}</p>       
                    </div>
                    
                    <div class="option ${quizzPromise.questions[i].answers[list3[1]].isCorrectAnswer}" data-identifier="answer" onclick="selectAnswersQuizz(this)">
                        <img src="${quizzPromise.questions[i].answers[list3[1]].image}">  
                        <p>${quizzPromise.questions[i].answers[list3[1]].text}</p>
                    </div>

                </div>
            </div>
            `
        }
        list.sort(comparador);
        list2.sort(comparador);
        list3.sort(comparador);
    }
}

function resultQuizz(){
    const percent = contTrue/howManyQuizz;
    const percentage = Math.floor(percent);
    for(let i = quizzPromise.levels.length; i  > 0 ; i--){
        if(percentage >= quizzPromise.levels[i-1].minValue){
            layout2.innerHTML +=`
            <div class="box-quizz result-quizz" data-identifier="quizz-result">
                <div class="quizz-title">
                    <h1>${percentage}% de acerto: ${quizzPromise.levels[i-1].title}</h1>
                </div>
                <div class="result">
                    <img src="${quizzPromise.levels[i-1].image}" alt="">
                    <P>${quizzPromise.levels[i-1].text}</P>
                </div class="buttons-settings">
                    <button class="button-reload" onclick="reloadQuizz(this)">Reiniciar Quizz</button>
                    <button class="button-home" onclick="reloadPage()">Voltar pra home</button>
                </div>
            `
            break;
        }
    }
}
const scrollUp = document.querySelector(".layout-2");

function reloadQuizz(){
    layout2.innerHTML =" ";
    showSelectedQuizz(reloadedQuizz);
    cont = 0;
    contTrue = 0;
    cont2 = 0;
}

function createQuizz() {   
    layout1.classList.add('hidden');
    layout3.classList.remove('hidden');
}

function continueToQuestions() {
    
    const errorsBeginning = document.querySelectorAll('.beginning .error');
    let validTitle = false;
    let validUrl = false;
    let validQuestionNumber = false;
    let validLevelNumber = false;

    
    if (titleInput.value.replace(/\s/g, '').length >= 20 && titleInput.value.replace(/\s/g, '').length <= 65 && titleInput.value !== '') {
        titleInput.classList.remove('error-color-input');
        errorsBeginning[0].classList.add('hidden');
        validTitle = true;
    } else {
        titleInput.classList.add('error-color-input');
        errorsBeginning[0].classList.remove('hidden');
    }

    if (isURL(urlInput.value)) {
        urlInput.classList.remove('error-color-input');
        errorsBeginning[1].classList.add('hidden');
        validUrl = true;
    } else {
        urlInput.classList.add('error-color-input');
        errorsBeginning[1].classList.remove('hidden');
    }

    if (questionsQuantity.value % 1 === 0 && questionsQuantity.value >= 3 && isNaN(parseInt(questionsQuantity.value)) === false) {
        questionsQuantity.classList.remove('error-color-input');
        errorsBeginning[2].classList.add('hidden');
        validQuestionNumber = true;
    } else {
        questionsQuantity.classList.add('error-color-input');
        errorsBeginning[2].classList.remove('hidden');
    }

    if (levelsQuantity.value % 1 === 0 && levelsQuantity.value >= 2 && isNaN(parseInt(levelsQuantity.value)) === false) {
        levelsQuantity.classList.remove('error-color-input');
        errorsBeginning[3].classList.add('hidden');
        validLevelNumber = true;
    } else {
        levelsQuantity.classList.add('error-color-input');
        errorsBeginning[3].classList.remove('hidden');
    }


    if (validTitle && validUrl && validQuestionNumber && validLevelNumber) {
        beginning.classList.add('hidden');
        questions.classList.remove('hidden');
        showQuestions(parseInt(questionsQuantity.value));
    }

}

function showQuestions(num) {

    for (let i = 2; i < (num+1); i++) {
        questions.innerHTML += `
            <div class="inputs-div">

                <div class="minimize sub-sub-title" data-identifier="expand" onclick="maximizeQuestion(this)">
                    <p>Pergunta ${i}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>


                <div class="closed hidden">
                    <div class="question sub-sub-title"><p>Pergunta ${i}</p>
                        <input class="question-title" data-identifier="question" placeholder="Texto da pergunta" type="text">
                        <input class="color" data-identifier="question" placeholder="Cor de fundo da pergunta" type="text">
                    </div>

                    <div class="correct-answer sub-sub-title"><p>Resposta correta</p>
                        <input class="answer" data-identifier="question" placeholder="Resposta correta" type="text">
                        <input class="url" data-identifier="question" placeholder="URL da imagem" type="text">
                    </div>

                    <div class="incorrect-answers sub-sub-title"><p>Respostas incorretas</p>
                        <input class="answer" data-identifier="question" placeholder="Resposta incorreta 1" type="text">
                        <input class="url" data-identifier="question" placeholder="URL da imagem 1" type="text">

                        <input class="answer" data-identifier="question" placeholder="Resposta incorreta 2" type="text">
                        <input class="url" data-identifier="question" placeholder="URL da imagem 2" type="text">

                        <input class="answer" data-identifier="question" placeholder="Resposta incorreta 3" type="text">
                        <input class="url" data-identifier="question" placeholder="URL da imagem 3" type="text">
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
    // find whoever is open and close it
    const openQuestion = questions.querySelector('.open');
    openQuestion.classList.add('closed');
    openQuestion.classList.add('hidden');
    openQuestion.classList.remove('open');

    // remove minimize of the brother element  
    const minimize = openQuestion.parentNode.querySelector('.minimize');
    minimize.classList.remove('hidden');

    // hide clicked element
    question.classList.add('hidden');

    const closedDiv = question.parentNode.querySelector('.closed');
    closedDiv.classList.remove('closed');
    closedDiv.classList.remove('hidden');
    closedDiv.classList.add('open');
}


let answersArray = [];
let questionsArray = [];
let levelsArray = [];

function continueToLevels() {

    const allTitlesSelected = document.querySelectorAll('.questions .question-title');
    const allColorsSelected = document.querySelectorAll('.questions .color');
    const allAnswersSelected = document.querySelectorAll('.questions .answer');
    const allUrlSelected = document.querySelectorAll('.questions .url');
    
    answersArray = [];
    questionsArray = [];
    // answers array in blocks of 4
    for (let i = 0; i < allTitlesSelected.length; i++) {
        answersArray.push([{text:allAnswersSelected[4*i].value ,image:allUrlSelected[4*i].value, isCorrectAnswer: true},
                        {text:allAnswersSelected[4*i+1].value, image:allUrlSelected[4*i+1].value, isCorrectAnswer: false},
                        {text:allAnswersSelected[4*i+2].value, image:allUrlSelected[4*i+2].value, isCorrectAnswer: false},
                        {text:allAnswersSelected[4*i+3].value, image:allUrlSelected[4*i+3].value, isCorrectAnswer: false}]);
    }

    // remove empty answers
    for (let i = 0; i < allTitlesSelected.length; i++) {
        let arrayIJ = [];
        for (let j = 0; j < answersArray[i].length; j++) {
            if (answersArray[i][j].text !== '' && answersArray[i][j].image !== '') {
                arrayIJ.push(answersArray[i][j]);
            }
        }
        
        questionsArray.push({title:allTitlesSelected[i].value, color:allColorsSelected[i].value , answers:arrayIJ});
    }

    if (filterQuestions()) { 
        questions.classList.add('hidden');
        levels.classList.remove('hidden');
        showLevels(parseInt(levelsQuantity.value));
    }
}

function filterQuestions() {

    // text > 20
    for (let i = 0; i < questionsArray.length; i++) {
        if (questionsArray[i].title.replace(/\s/g, '').length < 20 || questionsArray[i].title === '') {
            alert(`Texto da Pergunta ${i+1} errado`);
            return false;
        }
    }

    // color format
    for (let i = 0; i < questionsArray.length; i++) {
        if (isHexadecimal(questionsArray[i].color) === false) {
            alert(`Cor da Pergunda ${i+1} formato inválido`);
            return false;
        }
    }

    // first and second question can't be empty
    for (let i = 0; i < answersArray.length; i++) {
        for (let j = 0; j < 2; j++) {
            if (answersArray[i][j].text.replace(/\s/g, '').length === 0 || answersArray[i][j].image.replace(/\s/g, '').length === 0 || !isURL(answersArray[i][j].image)) {
                if (j === 0) {
                    alert(`Preencha a resposta certa`);
                } else {
                    alert(`Preencha pelo menos a primeira resposta errada`)
                }
                return false;
            }
        }
    }

    // URL check
    for (let i = 0; i < answersArray.length; i++) {
        for (let j = 0; j < 2; j++) {
            if (!isURL(answersArray[i][j].image)) {
                alert(`URL ${j} inválida`)
                return false;
            }
        }
    }

    
    return true;
}

function isHexadecimal(string) {

    string = string.toLowerCase();

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

                <div class="minimize sub-sub-title" data-identifier="expand" onclick="maximizeLevel(this)">
                    <p>Nível ${i}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>
                
                <div class="closed hidden">
                    <div class="level-info sub-sub-title"><p>Nível ${i}</p>
                        <input class="level-title" data-identifier="level" placeholder="Título do nível" type="text">
                        <input class="percentage" data-identifier="level" placeholder="% de acerto mínima" type="text">
                        <input class="level-url" data-identifier="level" placeholder="URL da imagem do nível" type="text">
                        <input class="level-description" data-identifier="level" placeholder="Descrição do nível" type="text">
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
    
    const openLevel = levels.querySelector('.open');
    openLevel.classList.add('closed');
    openLevel.classList.add('hidden');
    openLevel.classList.remove('open');

 
    const minimize = openLevel.parentNode.querySelector('.minimize');
    minimize.classList.remove('hidden');


    level.classList.add('hidden');


    const closedDiv = level.parentNode.querySelector('.closed');
    closedDiv.classList.remove('closed');
    closedDiv.classList.remove('hidden');
    closedDiv.classList.add('open');
}


function finishQuizz() {

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

        levels.classList.add('hidden');
        loading.classList.remove('hidden');
    }
}

let currentIdCreated;

function goToFinalCreationPage(createdQuizz) {

    const stringFormOfCreatedQuizz = JSON.stringify(createdQuizz); 
    localStorage.setItem(`${createdQuizz.data.id}`,stringFormOfCreatedQuizz);
    currentIdCreated = createdQuizz.data.id;

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
    
    loading.classList.add('hidden');
    ending.classList.remove('hidden');
}

function accessCreatedQuizz() {

    ending.classList.add('hidden');
    layout3.classList.add('hidden');

    
    const getActualQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${currentIdCreated}`);
    getActualQuizz.then(showSelectedQuizz);
    
    loading.classList.remove('hidden');
}

function filterLevels() {
        
    const levelTitlesSelected = document.querySelectorAll('.levels .level-title');
    const levelPercentages = document.querySelectorAll('.levels .percentage');
    const levelUrlSelected = document.querySelectorAll('.levels .level-url');
    const levelDescriptionSelected = document.querySelectorAll('.levels .level-description');


    // title > 10 characters
    for (let i = 0; i < levelTitlesSelected.length; i++) {
        if (levelTitlesSelected[i].value.replace(/\s/g, '').length < 10) {
            alert(`Título ${i+1} muito curto`);
            return false;
        }
    }

    // % between 0 e 100
    for (let i = 0; i < levelPercentages.length; i++) {
        if (levelPercentages[i].value % 1 !== 0 || levelPercentages[i].value < 0 || levelPercentages[i].value > 100 || isNaN(parseInt(levelPercentages[i].value)) ) {
            alert(`Porcentagem ${i+1} no formato errado`);
            return false;
        }
    }

    // URL check
    if (!isURL(levelUrlSelected.value)) {
        alert('Digite um link válido');
        return false;
    }


    // level description > 30 characters
    for (let i = 0; i < levelDescriptionSelected.length; i++) {
        if (levelDescriptionSelected[i].value.replace(/\s/g, '').length < 30) {
            alert(`Descrição ${i+1} muito curta`);
            return false;
        }
    }

    // at least one % equal to 0
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

function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return pattern.test(str);
}

function deleteQuizz(ionIcon) {
    const currentId = ionIcon.parentNode.parentNode.id;
    const normalFormOfStringify = JSON.parse(localStorage.getItem(`${currentId}`));
    if(window.confirm('Quer mesmo remover esse Quizz?')) {
        axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${currentId}`,{headers: {'Secret-Key':`${normalFormOfStringify.data.key}`}}).then(reloadPage);
    } else {
        reloadPage();
    }
}