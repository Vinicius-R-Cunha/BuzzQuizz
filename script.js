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

function showSelectedQuizz(selectedQuizz) {
    // essa função recebe o quizz selecionado:
    // e monta o layout-2 com ele:
    console.log(selectedQuizz);
    // com esse selectedQuizz.data temos todos os dados desse quizz para criar o layout-2
}










function createQuizz() {   
    layout1.classList.add('hidden');
    layout3.classList.remove('hidden');
}

function continueToQuestions() {
    console.log(titleInput.value);
    console.log(urlInput.value);
    console.log(questionsQuantity.value);
    console.log(levelsQuantity.value);

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



}

function continueToLevels() {
    questions.add('hidden');
    levels.remove('hidden');
}





