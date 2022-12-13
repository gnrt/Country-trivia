var map = L.map('map').setView([51.505, -0.09], 5);
var score = 0;
var result=false
var counter = document.querySelector('.scoreCounter')
console.log(data);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// populate map with clickable markers
for (var i = 0; i < data.length; i++) {
    var marker = L.marker([data[i].CapitalLatitude, data[i].CapitalLongitude], { title: data[i].CountryName }).addTo(map);
   
    marker.on('click', function (event) {
        console.log(event.target.options.title);
        getApi(event.target.options.title);
        
    });
};

// ----------------------------- Trivia functionality -----------------------------



// note: this fetch function was given by the creator of The Trivia API
// Using this function we can search for questions by manipulating 'freetext' 
// body parameter
function getApi(search) {
    //$("input:text").val();// = <form submission while testing>    // this variable will be loaded with the country's name from map
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
            // successfully loads in question to questionText div.  need to use [0] for data array to work!!
            questionText.textContent = data[0].question;
            console.log(data[0].question);
            // create array with all answers
            // generate answers in random order
            var ansKey = [data[0].incorrectAnswers[0], data[0].incorrectAnswers[1], data[0].incorrectAnswers[2], data[0].correctAnswer];
            console.log(data[0].correctAnswer);
            // randomize order of answers
            shuffle(ansKey);
            console.log(ansKey);

            var buttonList = document.querySelector('#answer-buttons');

            for (var b = 0; b < ansKey.length; b++) {
                var multChoice = document.createElement('button');
                multChoice.type = 'button';
                multChoice.textContent = ansKey[b];

                buttonList.appendChild(multChoice);

            };
            
            buttonList.addEventListener('click', function(event){
                event.preventDefault();

                if(event.target.textContent == data[0].correctAnswer){
                    result = true;
                    questionText.innerHTML = 'You are correct!';
                    console.log('right')
                    ansKey = 0;
                } 
                else {
                    result = false;
                    questionText.innerHTML = 'You are incorrect!';
                    console.log('wrong')
                    ansKey = 0;
                };
                // scoreKeeper(result);
                while(buttonList.firstChild){
                buttonList.removeChild(buttonList.lastChild);
            } 


                return;
            });

        });

    return;
};




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



// function scoreKeeper (result){
//     const score = parseInt(counter.innerHTML);

//     if(result == true) {
//         counter.innerHTML = score + 1;
//     } else if (score == 0 && result == false) {
//         return;
//     } else {
//         counter.innerHTML = score - 1;
//     }
//     console.log(score);
// };