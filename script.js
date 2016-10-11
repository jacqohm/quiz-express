$(document).ready(function ($) {
  $("#harry_music").get(0).play();
  // var quiz = document.getElementById("quiz")
  var askQuestion = document.getElementById('askQuestion')
  var submitButton = document.getElementById('submitButton')
  var resetBtn = document.getElementById('resetBtn')
  var replayBtn = document.getElementById('replayBtn')
  var player1_name
  var player2_name
  var checkedRadio
  var allRadios
  var counter = 0
  var qnsNum
  var currentPlayer = 'Player 1'
  var QnsP1 = 1
  var QnsP2 = 1
  var scoreP1 = 0
  var scoreP2 = 0

  var questions = [
    {
      question: "Snape's Patronus takes the form of what animal?",
      choices: ['Snake', 'Doe', 'Serpent', 'Stag'],
      correct: 1
    },
    {
      question: 'Who did Harry Potter bring to the Yule Ball?',
      choices: ['Cho Chang', 'Ginny Weasley', 'Parvati Patil', 'Padma Patil'],
      correct: 2
    },
    {
      question: 'What type of car did Mr. Weasley bewitch to fly?',
      choices: ['Ford Anglia', 'Triumph Twelve', 'Mustang', 'Ford Angela'],
      correct: 0
    },
    {
      question: "What is the name of Ron's pet rat?",
      choices: ['Scuffles', 'Scrabbles', 'Pebbles', 'Shuffles'],
      correct: 1
    },
    {
      question: 'How many times was Nearly Headless Nick hit in the neck with a blunt axe?',
      choices: ['25', '35', '45', '55'],
      correct: 2
    },
    {
      question: "Who slain Lord Voldermort's last Horcrux - Nagini?",
      choices: ['Hagrid', 'Ron Weasley', 'Harry Potter', 'Neville Longbottom'],
      correct: 3
    },
    {
      question: "What is Dumbledore's sister's name?",
      choices: ['Ariene', 'Arianne', 'Alenna', 'Ariana'],
      correct: 3
    },
    {
      question: "What is the magical core of Harry's wand?",
      choices: ["Dragon's Blood", 'Pheonix Tail Feather', 'Pheonix Tears', 'Unicorn Hair'],
      correct: 1
    },
    {
      question: 'What name did Hagrid gave his pet dragon?',
      choices: ['Sorbet', 'Nugget', 'Norbert', 'Noburt'],
      correct: 2
    },
    {
      question: 'What was Harry given by Professor Lupin after the first summoning of a Patronus?',
      choices: ['Chocolate', 'Chocolate Frog', 'A frog', 'Nothing'],
      correct: 1
    },
    {
      question: 'What is the correct incantation of a Levitation Charm?',
      choices: ['Wingadam Leviosa', 'Wingardum Levosa', 'Wingardium Levieosa', 'Wingardium Leviosa'],
      correct: 3
    }
  ]

  $('#start_quiz').click(function () {
    $('.welcome_box').hide()
    $('.player_box').show()
  })

  function currentQuestion () {
    if (counter < 10) {
      qnsNum = Math.floor(Math.random() * (questions.length - 1))
      console.log(questions, qnsNum)
      // console.log('qnsNum now is', qnsNum, 'out of', questions.length)
      askQuestion.innerHTML = questions[qnsNum].question
      for (var k = 0; k < 4; k++) {
        document.getElementById('answer' + k).innerHTML = questions[qnsNum].choices[k]
        document.getElementById('answer' + k).setAttribute('for', questions[qnsNum].choices[k])
        document.getElementById('label' + k).setAttribute('value', questions[qnsNum].choices[k])
      }
    } else {
      $('#quiz').hide()
      $('#result_box').show()
      if (scoreP1 > scoreP2) {
        $('#winner').html(player1_name)
      // console.log('winner1')
      } else if (scoreP2 > scoreP1) {
        $('#winner').html(player2_name)
      // console.log('winner2')
      } else {
        $('#tieMessage').show()
        $('#resultmessage').hide()
        // location.reload();
      }
    }
    // counter is listed ontop as a condition < 10
    // more than assign value of 10 qns loop will break
    counter++
  }

  $('#submitNameBtn').click(function () {
    $('.player_box').hide()
    $('#quiz').show()
    player1_name = $('#inputsm-p1').val()
    player2_name = $('#inputsm-p2').val()
    $('#playerName').html(player1_name)
    currentQuestion()
    $('#displayQnsNum').html(QnsP1)
  })

  submitButton.addEventListener('click', function (e) {
    e.preventDefault()
    allRadios = document.getElementsByName('option')
    var isChecked = false
    for (var j = 0; j < allRadios.length; j++) {
      if (allRadios[j].checked) {
        isChecked = true
        checkedRadio = j
        break
      }
    }
    if (!(isChecked)) {
      alert('Please select an answer before moving on')
    } else {
      deselectRadios()
      getResults()

      if (currentPlayer === 'Player 1') {
        currentPlayer = 'Player 2'
        $('#playerName').html(player2_name)
        $('#displayQnsNum').html(QnsP2)
        QnsP2++
      } else {
        QnsP1++
        currentPlayer = 'Player 1'
        $('#playerName').html(player1_name)
        $('#displayQnsNum').html(QnsP1)
      }
      currentQuestion()
    }
  })

  resetBtn.addEventListener('click', function () {
    $('#quiz').hide()
    $('#result_box').hide()
    $('.welcome_box').show()
    QnsP1 = 1
    QnsP2 = 1
    counter = 0
    currentPlayer = 'Player 1'
    deselectRadios()
  })

  // get all the elements with "option" which is my radio buttons!
  function deselectRadios () {
    allRadios = document.getElementsByName('option')
    for (var p = 0; p < allRadios.length; p++) {
      allRadios[p].checked = false
    }
  }

  function getResults () {
    // console.log(qnsNum, questions[qnsNum])
    // console.log('corret ans ' + questions[qnsNum].choices[questions[qnsNum].correct])
    if (allRadios[checkedRadio].value === questions[qnsNum].choices[questions[qnsNum].correct]) {
      if (currentPlayer === 'Player 1') {
        scoreP1++
        $('#displayScore1').html(scoreP1)
        // console.log(currentPlayer + scoreP1)
      } else {
        scoreP2++
        $('#displayScore2').html(scoreP2)
        // console.log(currentPlayer + scoreP2)
      }
    }
    questions.splice(qnsNum, 1)
  }

  replayBtn.addEventListener('click', function () {
    $('#quiz').hide()
    $('#result_box').hide()
    $('.welcome_box').show()
    QnsP1 = 1
    QnsP2 = 1
    counter = 0
    currentPlayer = 'Player 1'
    deselectRadios()
  })
})
