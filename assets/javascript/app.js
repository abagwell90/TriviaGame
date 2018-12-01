
var questionSets = [{
  question: "Which English Explorer made a voyage around the world, defeating the Spanish Armada, and claimed California for England at the time?",
  choices: ["Vasco da Gama", "Sir Francis Drake", "John Cabot", "Jacques Cartier"],
  correctAnswer: "Sir Francis Drake"
}, {
  question: "Which explorer searched for the fountain of youth, in what is now the state of Florida?",
  choices: ["John Cabot", "Francisco Pizarro", "Jacques Cartier", "Juan Ponce de Leon"],
  correctAnswer: "Juan Ponce de Leon"
}, {
  question: "Which Italian explorer traved to the far east, between 1271-1295, to what was known then as Cathay or China?",
  choices: ["Marco Polo", "Amerigo Vespucci", "Francisco Pizarro", "Sir Francis Drake"],
  correctAnswer: "Marco Polo"
}, {
  question: "Which explorer was the first woman in space?",
  choices: ["Marsha Ivins", "Roberta Bondar", "Millie Hughes-Fulford", "Valentina Tereshkova"],
  correctAnswer: "Valentina Tereshkova"
}, {
  question: "Which Portuguese explorer was the first to reach India by Sea, which ended up being first link Europe and Asia by ocean route?",
  choices: ["Vasco da Gama", "Amerigo Vespucci", "Marco Polo", "Francisco Pizarro"],
  correctAnswer: "Vasco da Gama"
}, {
  question: "Which explorer was the first woman to make flight across Atlantic?",
  choices: ["Louise Thaden", "Amelia Earhart", "Valentina Tereshkova", "Amy Johnson"],
  correctAnswer: "Amelia Earhart"
}];

let intervalId;

const formRow = (num, choices, question) => {
  return `
<div class="form-group">
  <fieldset>
    <label class="col-md-12 control-label" for="radios">${num + 1}) ${question} </label>
    <div class="col-md-12"> 
      <input type="radio" name="radios-${num}" id="radios-0" value="0">
      <label class="radio-inline" for="radios-0">  
      ${choices[0]}
      </label>      
      <input type="radio" name="radios-${num}" id="radios-1" value="1">
      <label class="radio-inline" for="radios-1">
          ${choices[1]}
      </label> 
      <input type="radio" name="radios-${num}" id="radios-2" value="2">
      <label class="radio-inline" for="radios-2">
      ${choices[2]}
      </label> 
      <input type="radio" name="radios-${num}" id="radios-3" value="3">
      <label class="radio-inline" for="radios-3">
        ${choices[3]}
      </label>
    </div>
  </fieldset>
</div>`;
}

const makeForm = () => {
  for (var i = 0; i < questionSets.length; i++) { 
    var questionSet = questionSets[i];
    $("#quiz").append(formRow(i, questionSet.choices, questionSet.question));
  }
};

$(document).ready(function () {
  $("section").hide();
  $("#playAgain").hide();
  $("#showScore").hide();
  makeForm();
});

$("#startTrivia").click(function () {
  $("section").show();
  $(".startTriviaSection").hide();
  $(document).css("background-image", "url(./assets/images/ship2.png)");
  var oneAndHalfMin = 90; 
  var displayEl = document.querySelector('#time');
  startTimer(oneAndHalfMin, displayEl, submitQuiz);
});

$("#submitButton").click(function () {
  $(".startTriviaSection").hide();
  $("#showScore").show();
  $("#playAgain").show();
  submitQuiz();
  clearInterval(intervalId);
   $("#submitButton").hide();
});

$("#playAgain").click(function () {
  location.reload();
});

var submitQuiz = function () {
  let correctCounter = 0;
  let wrongCounter = 0;
  for (var i = 0; i < questionSets.length; i++) {
    const choiceNum = $(`input[name=radios-${i}]:checked`).val();
    const choice = questionSets[i].choices[choiceNum]; 
    const correctAnswer = questionSets[i].correctAnswer; 

    if (choice === correctAnswer){
      correctCounter++
    } else {
      wrongCounter++
    }
  }

  $("#showScore").replaceWith(
    `<h1>You got ${correctCounter} right</h1>
     <h1>You got ${wrongCounter} wrong</h1>`
  );
}

function startTimer(duration, displayEl, cb) {
  var timer = duration;
  intervalId = setInterval(function () {
    const minutes = parseInt(timer / 60, 10)
    const seconds = parseInt(timer % 60, 10);

    let zeroedMinutes;
    if (minutes < 10) {
      zeroedMinutes = "0" + minutes
    } else {
      zeroedMinutes = minutes;
    }

    let zeroedSeconds
    if (seconds < 10) {
      zeroedSeconds = "0" + seconds
    } else {
      zeroedSeconds = seconds;
    }
    displayEl.textContent = zeroedMinutes + ":" + zeroedSeconds;
    timer--;
    if (timer < 0) {
      cb();
      clearInterval(intervalId)
    }
  }, 1000);
}