let xhr = new XMLHttpRequest()
xhr.open('GET','https://opentdb.com/api.php?amount=10&category=15&type=multiple')
let questions = []
let count = 0
let trueCount = 0

xhr.onload = () =>{
    questions = JSON.parse(xhr.responseText).results
    show(questions[count])
}
xhr.send()


function check(){
    let answers = document.querySelectorAll('.quiz__list input')
    answers.forEach(answer => {
        if (answer.checked && answer.value == questions[count].correct_answer){
            trueCount++
        }
    })
    if (count==9){
        document.querySelector('.quiz').style.display='none'
        document.querySelector('.results').style.display = 'block'
        document.getElementById('res').textContent = trueCount
        return false
    }
    count++
    show(questions[count])
}

function show(q){
    document.querySelector('.quiz__true').textContent = count+1
    document.querySelector('.quiz__question').textContent = q.question
    let answers = q.incorrect_answers
    answers.push(q.correct_answer)
    answers = shuffleArray(answers)
    let quizList = document.querySelector('.quiz__list')
    quizList.innerHTML = ''
    let i = 0
    answers.forEach(answer => {
        quizList.innerHTML+= `<div class="quiz__input">
            <input type="radio" name="answer" value="${answer}" id="answer${i}">
            <label for="answer${i}">${answer}</label>
        </div>`
        i++
    })
}

function shuffleArray(array) { // 4
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}