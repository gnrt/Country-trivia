// this is the section for the trivia API

// William Distefano, part of group 2

// recieve query for country name from map api
// pull one random question about that country
// record score to localData

// ------------------------------------------------------------------------------------------

var quizBody = document.querySelector('.quiz');      // document location of the trivia widget to be added

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
        });

};

getApi();


// <<<<<<<<<<<<<<<<<< META >>>>>>>>>>>>>>>>>>>>>>

// There's no need for an API key to request questions, simply send a GET request to
// https://the-trivia-api.com/api/questions

// find docs for help with api
// https://thetriviaapi.com/docs/
