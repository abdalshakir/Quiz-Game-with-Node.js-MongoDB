function getAllQuestions() {
    axios.get('http://localhost:3000/questions')
        .then(response => {
            let questionsArray = response.data;
            questionsArray.map((e, i) => {
                document.getElementById('questions').innerHTML += `
                <div class="text-light bg-dark mb-3 p-3 m-2 rounded">
                <h4>Q${i+1}) ${e.question}</h4>
                <h4>a. ${e.optionA}</h4>
                <h4>b. ${e.optionB}</h4>
                <h4>c. ${e.optionC}</h4>
                </div>
            `
            })
            update(questionsArray)
        }).catch(err => {
            console.log(err)
        })
}

getAllQuestions()

function update(array) {
    console.log(array.length)
    if (array.length == 5) {
        document.getElementById('add').disabled = true;
        alert("Questions limit exceeded")
    }
}

function addQuestions() {
    let question = document.getElementById('question').value;
    let optionA = document.getElementById('optionA').value;
    let optionB = document.getElementById('optionB').value;
    let optionC = document.getElementById('optionC').value;
    let correctAnswer = document.getElementById('correctAnswer').value;

    axios.post('http://localhost:3000/admin', {
        question: question,
        optionA: optionA,
        optionB: optionB,
        optionC: optionC,
        correctAnswer: correctAnswer
    }).then(response => {
        console.log(response);
        alert(response.data)
    }).catch(err => {
        console.log(err)
    })

    document.getElementById('question').value = "";
    document.getElementById('optionA').value = "";
    document.getElementById('optionB').value = "";
    document.getElementById('optionC').value = "";
    document.getElementById('correctAnswer').value = "";
}