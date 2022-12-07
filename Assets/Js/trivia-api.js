// this is the section for the trivia API

// William Distefano, part of group 2

// recieve query for country name from map api
// pull one random question about that country
// record score to localData

// ------------------------------------------------------------------------------------------

var quizBody = document.querySelector('.question-box');     // document location of the trivia widget to be added
var score = localStorage.getItem('score');          // store 'score' data from previous games

function getApi() {
    var triviaUrl = "https://the-trivia-api.com/api/questions?limit=1";

    fetch(triviaUrl, {
        method: 'GET'
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            // here we will create the quiz format
            var questionText = document.querySelector('.question')  // link to html location to create element for question display
            var answerButtons   // link to html location to create buttons for potential answers

            //  successfully loads in question to questionText div.  need to use [0] for data array to work!!
            questionText.textContent = data[0].question;
            console.log(data[0].question);

            // questionText.append(questionText);
        });

};

getApi();


// <<<<<<<<<<<<<<<<<< META >>>>>>>>>>>>>>>>>>>>>>

// There's no need for an API key to request questions, simply send a GET request to
// https://the-trivia-api.com/api/questions

// find docs for help with api
// https://thetriviaapi.com/docs/
