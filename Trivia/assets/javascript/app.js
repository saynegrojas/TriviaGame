//variables
var answer = 0,
    wrongAnswer = 0,
    notAnswered = 0,
    timeRemaining = 20,
    intervalID,
    qAndAindex = 0,
    answered = false,
    rightAnswer = 0;

//objects for questions/answer
var game = [{
    question: "How much of A-City was destroyed by Boros' ship?",
    answer: ["100%", "99.8%", "95%", "98.6"],
    rightAnswer: "1"
    //images:
}, {
    question: "What is the name of the scientist that creates Carnage Kabuto?",
    answer: ["Dr. Genus", "Dr. Robotnik", "Dr. Wily", "Dr.Zhivago"],
    rightAnswer: "0"
    //images: 
}, {
    question: "What do these bird-people call themselves?",
    answer: ["Skyfolk", "Phoenixes", "Bird-Person Society", "Skyloftians"],
    rightAnswer: "0"
    //images:
}, {
    question: "What is Tatsumaki's rank in S-Class?",
    answer: ["1st", "2nd", "3rd", "4th"],
    rightAnswer: "1"
    //images:
}, {
    question: "What bug drives Saitama crazy?",
    answer: ["A fly", "An Ant", "A mosquito", "A wasp"],
    rightAnswer: "0"
    //images:
}];

//start game 
function start() {
    $(".play").remove();
    rightAnswer = 0;
    wrongAnswer = 0;
    notAnswered = 0;
    questionAnswer();
}
$(".play").click(function () {
    start();
}); 
//questions/answers
function questionAnswer() {
    answered = false;
    timeRemaining = 20;
    intervalID = setInterval(timer, 1000);
    if (answered === false) {
        timer();
    }
    rightAnswer = game[qAndAindex].rightAnswer;
    var question = game[qAndAindex].question;

    $(".question").html(question);
    for (var i = 0; i < 4; i++) {
        var answer = game[qAndAindex].answer[i];
        $(".answers").append("<h4 class= answerAll id=" + i + ">" + answer + "</h4>");
    }
    $("h4").click(function () {
        var id = $(this).attr("id");
        if (id === rightAnswer) {
            answered = true; // stops the timer
            $(".question").html("<h4> The Right Answer was : " + game[qAndAindex].answer[rightAnswer] + "</h4>");
            right();
        } else {
            answered = true; 
            $(".question").html("<h4> You chose </h4>" + game[qAndAindex].answer[id] + "<h4> The correct answer was </h4> " + game[qAndAindex].answer[rightAnswer]);
            wrong();
        }
    });

}
//timer
function timer() {
    if (timeRemaining === 0) {
        answered = true;
        $(".question").html("<h4> The Answer is : </h4> " + game[qAndAindex].answer[rightAnswer]);
        unAnswered();
    } else if (answered === true) {
        clearInterval(intervalID);
    } else {
        timeRemaining--;
        $(".timeRemaining").html("<h4> Time Remaining: </h4>" + timeRemaining);
    }
}

function right() {
    rightAnswer++;
    $(".answers").html("");
    $(".timeRemaining").html("<h4> Good Job! </h4>");
    reset();
}

function wrong() {
    wrongAnswer++;
    $(".answers").html("");
    $(".timeRemaining").html("<h4> Wrong Answer! </h4>");
    reset();
}

function unAnswered() {
    notAnswered++;
    $(".timeRemaining").html("<h4> Time's Up! </h4>");
    reset();
}

function reset() {
    $(".answersAll").remove();
    qAndAindex++;
    if (qAndAindex < game.length) {
        setTimeout(function () {
            questionAnswer();
        }, 1000);
    } else {
        setTimeout(function () {
            $(".question").remove();
            $(".timeRemaining").remove();
            $(".answers").append("<h4 class= answersAll end>Right Answers: " + rightAnswer + "</h4>");
            $(".answers").append("<h4 class= answersAll end>Wrong Answers:" + wrongAnswer + "</h4>");
            $(".answers").append("<h4 class= answersAll end>No Answers:" + notAnswered + "</h4>");
            setTimeout(function () {
                location.reload();
            }, 4000);
        }, 2000);
    }
};
