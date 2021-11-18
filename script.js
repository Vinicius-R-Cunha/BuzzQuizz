getQuizzes();

const layout1 = document.querySelector('.layout-1');
const layout2 = document.querySelector('.layout-2');
const layout3 = document.querySelector('.layout-3');


const beginning = document.querySelector('.beginning');
const questions = document.querySelector('.questions');
const levels = document.querySelector('.levels');


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
    console.log('clicou em criar');
    
    layout1.classList.add('hidden');
    layout3.classList.remove('hidden');
}

function continueToQuestions() {
    beginning.classList.add('hidden');
    questions.classList.remove('hidden');
}

function continueToLevels() {
    questions.add('hidden');
    levels.remove('hidden');
}





