getQuizzes();

function openQuizz(quizz) {
    // vai para o Layout 2 do quizz clicado
    const layout1 = document.querySelector('.layout-1');
    const layout2 = document.querySelector('.layout-2');

    // id do quizz que foi clicado
    const idQuizz = quizz.querySelector('.id').innerHTML;

    // esconde o layout-1
    layout1.classList.add('hidden');

    // tira o escondido do layout-2
    layout2.classList.remove('hidden');
}

function getQuizzes() {   
    const quizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    
    quizzes.then(showQuizzes);
}

function showQuizzes(quizzes) {
    console.log(quizzes.data);
    const allQuizzes = document.querySelector('.all-quizzes');

    allQuizzes.innerHTML = '';

    for (let i = 0; i < quizzes.data.length; i++) {
        let id = quizzes.data[i].id;
        let image = quizzes.data[i].image;
        let title = quizzes.data[i].title;

        allQuizzes.innerHTML += `
            <div class="quizz" onclick="openQuizz(this)">
                <img class="quizz-img" src=${image}>
                <p class="quizz-name">${title}</p>
                <div class="gradient"></div>
                <div class="id hidden">${id}</div>
            </div>
        `
    }
}























