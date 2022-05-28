var min = 5;
var sec = 0;
var milisec = 0;
var second = document.getElementById("sec")
var minute = document.getElementById("min")
var timer;

function count() {
    milisec++
    if (milisec == 100) {
        sec--;
        milisec = 0;
        second.innerHTML = sec;
    } else if (min > 0 && sec == 0) {
        min--;
        sec = 59;
        second.innerHTML = sec;
        minute.innerHTML = min;
    } else if (min == 0 && sec == 0) {
        sec = 00;
        min = 00;
        sec.innerHTML = sec;
        minute.innerHTML = min;
    }
}
timer = setInterval(count, 10)

var questionsArray;
var countDown = 0;

function showQuestion(a) {
    axios.get('http://localhost:3000/questions')
        .then(response => {
            questionsArray = response.data;
            document.getElementById("que").innerHTML = questionsArray[a].question;
            document.getElementById("option1").innerHTML = questionsArray[a].optionA;
            document.getElementById("option2").innerHTML = questionsArray[a].optionB;
            document.getElementById("option3").innerHTML = questionsArray[a].optionC;
        }).catch(err => {
            console.log(err)
        })
    document.getElementById('queNum').innerText = a + 1;
}


function nextQuestion() {
    countDown++;
    console.log("Count Next ----> " + countDown)
    showQuestion(countDown);
    if (countDown === questionsArray.length - 1) {
        document.getElementById('nextButton').disabled = true;
        document.getElementById('backButton').disabled = false;
    } 
}

function backQuestion() {
    countDown--;
    console.log("Count Back ----> " + countDown)
    showQuestion(countDown);
    if (countDown === 0) {
        document.getElementById('backButton').disabled = true;
        document.getElementById('nextButton').disabled = false;
    } 
}

window.onload = function () {
    showQuestion(countDown);
}
