// 1. | Import data to use as the quiz questions - NL
// 2. | Set up HTML template (questions -> answer options)
// 3. | NOT DONE! Maybe do after, will default at 5 for now. Allow user to select the number of questions they want to answer
// 4. | Get question and answer options
//TODO 5. | Implement 'dropable' logic
//TODO 6. | Implement quiz logic and provide feedback to the user
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

  // console.log(questionAndAnswerObject);
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


window.addEventListener('load', setHTMLQuestionAndAnswers);