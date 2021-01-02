// 1. | Import data to use as the quiz questions - NL
// 2. | Set up HTML template (questions -> answer options)
// 3. | NOT DONE! Maybe do after, will default at 5 for now. Allow user to select the number of questions they want to answer
// 4. | Get question and answer options
// 5. | Implement 'dropable' logic
// 6. | Implement quiz logic and provide feedback to the user
//TODO 7. | Provide round-up of score inc. right and wrong questions
const getRandomIndexValues = maxValue => {
  return Math.floor(Math.random() * maxValue);
}

const getQuestionAndAnswerOptions = () => {
  let questionAndAnswerIndex = getRandomIndexValues(werkwoordenList.length);
  let randomNumber1 = getRandomIndexValues(werkwoordenList.length);
  let randomNumber2 = getRandomIndexValues(werkwoordenList.length);

  if (
    questionAndAnswerIndex === randomNumber1 || 
    randomNumber1 === randomNumber2
    ) {
      randomNumber1 = getRandomIndexValues(werkwoordenList.length);
    }
  else if (
    questionAndAnswerIndex === randomNumber2
  ) {
    randomNumber2 = getRandomIndexValues(werkwoordenList.length);
  }

  const question = werkwoordenList[questionAndAnswerIndex].engels;
  const answer = werkwoordenList[questionAndAnswerIndex].infin;
  const dummyAnswer1 = werkwoordenList[randomNumber1].infin;
  const dummyAnswer2 = werkwoordenList[randomNumber2].infin;
 
  const questionAndAnswerObject = { 
    question: `${question}`,
    answer: `${answer}`,
    dummyAnswer1: `${dummyAnswer1}`,
    dummyAnswer2: `${dummyAnswer2}`
  }

  return questionAndAnswerObject;
}

const setHTMLQuestionAndAnswers = () => {
  const indexArray = [1, 2, 3];
  let sortedIndexArray = indexArray.sort( () => {
    return 0.5 - Math.random();
  });  

  const questionAnswerData = getQuestionAndAnswerOptions();

  questionBox = document.querySelector('div.question h2');
  answerBox1 = document.getElementById(`answer${sortedIndexArray[0]}`);
  answerBox2 = document.getElementById(`answer${sortedIndexArray[1]}`);
  answerBox3 = document.getElementById(`answer${sortedIndexArray[2]}`);

  questionBox.innerHTML = questionAnswerData.question;
  answerBox1.innerHTML = questionAnswerData.answer;
  answerBox2.innerHTML = questionAnswerData.dummyAnswer1;
  answerBox3.innerHTML = questionAnswerData.dummyAnswer2;
}

// Drag & Drop

// Element that you're dragging
// 1. dragstart
// 2. drag
// 3. dragend

//Events on drop target
// 4. dragenter
// 5. dragover
// 6. drop

questionOption = document.querySelector('div.question h2');
questionOption.addEventListener('dragstart', dragStart);

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.innerHTML);
  const feedbackDiv = document.querySelector('div.feedback');
  feedbackDiv.innerHTML = '';
}

const answerOptions = document.querySelectorAll('div.answers h2');
answerOptions.forEach(answer => {
  answer.addEventListener('dragenter', dragEnter);
  answer.addEventListener('dragover', dragOver);
  answer.addEventListener('dragleave', dragLeave);
  answer.addEventListener('drop', drop);
});

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  e.target.classList.remove('drag-over');
}

function drop(e) {
  e.target.classList.remove('drag-over');

  // get the draggable element
  const draggedContent = e.dataTransfer.getData('text/plain');
  let dutchAnswer = werkwoordenList.find(word => word.infin === e.target.textContent);

  if (draggedContent === dutchAnswer.engels) {
    console.log('correct');
    renderFeedback('👍', 'Correct!', `<button class='play-again'>Go again</button>`);
  } else {
    console.log('fout');
    renderFeedback('😔', 'Terrible, try again!');
  }
}

const renderFeedback = (emoji, text, button = ``) => {
  const feedbackDiv = document.querySelector('div.feedback');
  feedbackDiv.innerHTML = `
  <h3>${emoji} ${text}!</h3>
  ${button}
  `;
  if (button) {
    const playAgainBtn = document.querySelector('button.play-again')
    playAgainBtn.addEventListener('click', setHTMLQuestionAndAnswers);
    playAgainBtn.addEventListener('click', () => {
      const feedbackDiv = document.querySelector('div.feedback');
      feedbackDiv.innerHTML = '';
    })
  }
}


window.addEventListener('load', setHTMLQuestionAndAnswers);
