// this is the section for the trivia API

// William Distefano, part of group 2

// recieve query for country name from map api
// pull one random question about that country
// record score to localData

// ------------------------------------------------------------------------------------------

var quizBody = document.querySelector('.question');     // document location of the trivia widget to be added
var score = localStorage.getItem('score');          // store 'score' data from previous games


// note: this fetch function was given by the creator of The Trivia API
// Using this function we can search for questions by manipulating 'freetext' 
// body parameter
function getApi() {
    var search = 'pakistan';//$("input:text").val();// = <form submission while testing>    // this variable will be loaded with the country's name from map
    var triviaUrl = "https://the-trivia-api.com/api/questions/search";

    fetch(triviaUrl, {
        "headers": {
            "content-type": "application/json",
            "x-api-key": "AXYoVAmtZJ4xLv8RXnct",
        },
        "body": "{\"perPage\":1,\"pageNumber\":1,\"freetext\":\"" + search + "\"}",
        "method": "POST",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // here we will create the quiz format
            var questionText = document.querySelector('.question');  // link to html location to create element for question display
            // var answerButtons = $('.answers');   // link to html location to create buttons for potential answers
            //             //  successfully loads in question to questionText div.  need to use [0] for data array to work!!
            questionText.textContent = data[0].question;
            console.log(data[0].question);

            // create array with all answers
            // generate answers in random order
            var ansKey = [data[0].incorrectAnswers[0], data[0].incorrectAnswers[1], data[0].incorrectAnswers[2], data[0].correctAnswer];

            // randomize order of answers
            shuffle(ansKey);
            console.log(ansKey);

            var buttonList = document.querySelector('#answer-buttons');

            for (var b = 0; b < 4; b++) {
                var multChoice = document.createElement('button');
                multChoice.type = 'button';
                multChoice.textContent = ansKey[b];

                buttonList.appendChild(multChoice);
            };

            buttonList.addEventListener('click', function(event){
                if(checkAnswer(event.target.textContent, data[0].correctAnswer)){
                    score++;
                    quizBody.textContent = 'You are correct!';
                    // this loop will terminate all buttons after giving answer boolean
                    while(buttonList.firstChild)
                        buttonList.removeChild(buttonList.lastChild);
                } else {
                    quizBody.textContent = 'You are incorrect!';
                    while(buttonList.firstChild)
                        buttonList.removeChild(buttonList.lastChild);
                };
                console.log("your answer was " + checkAnswer(event.target.textContent, data[0].correctAnswer));
            });
        });
    return;
};

// getApi();

// --- this button click will be replaced with marker selection on map ---
var button = document.querySelector('.btn1');

button.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(event.target);

    // button.style.display = 'none';
    getApi();
});

// --- end button click ---


// function to shuffle array so answers appear in random order when generated
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};

// if selected answer button matches text of data[0].correctAnswer, return true
// else return false
function checkAnswer(selection, answer) {
    console.log('correct = ' + answer);
    if(selection == answer){
        return true;
    } else {
        return false;
    };
}

// <<<<<<<<<<<<<<<<<< META >>>>>>>>>>>>>>>>>>>>>>

// There's no need for an API key to request questions, simply send a GET request to
// https://the-trivia-api.com/api/questions

// find docs for help with api
// https://thetriviaapi.com/docs/



// From Will Fry, creator of Trivia API
// search parameters for fetch
//
// freetext - text value to search for (optional)
// perPage - number of questions to return (defaults to 10)
// pageNumber - can be used in conjunction with perPage when there are more results than can be returned in one response (defaults to 1)
// categories - an array of categories to filter questions by (defaults to all categories)