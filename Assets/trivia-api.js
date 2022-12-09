// this is the section for the trivia API

// William Distefano, part of group 2

// recieve query for country name from map api
// pull one random question about that country
// record score to localData

// ------------------------------------------------------------------------------------------

var quizBody = document.querySelector('.question-box');     // document location of the trivia widget to be added
var score = localStorage.getItem('score');          // store 'score' data from previous games


// note: this fetch function was given by the creator of The Trivia API
// Using this function we can search for questions by manipulating 'freetext' 
// body parameter
function getApi() {
    var search =  $("input:text").val();// = <form submission>    // this variable will be loaded with the country's name from map
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
            // localStorage.setItem('lastQuestion', data[0].question);
//             // here we will create the quiz format
            var questionText = document.querySelector('.question');  // link to html location to create element for question display
            // var answerButtons = $('.answers');   // link to html location to create buttons for potential answers
//             //  successfully loads in question to questionText div.  need to use [0] for data array to work!!
            questionText.textContent = data[0].question;
            console.log(data[0].question);

            console.log(data[0].incorrectAnswers[0]);
            console.log(data[0].incorrectAnswers[1]);
            console.log(data[0].incorrectAnswers[2]);
            console.log(data[0].correctAnswer);


// ----------------------------------------------------  To be added, button creation and population with 4 answers  ---------------------------------------------------
            // var answers = [];
            // for(var i = 0; i < answers.length; i++){
            //     answers[i] = data[i].incorrectAnswers;
            //     console.log('answer ' + i + ": " + answers[i].textContent);
            // };
        });
        return;
};

// getApi();

var button = $('.btn');

button.on('click', function(event){
    event.preventDefault();
    getApi();
});

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