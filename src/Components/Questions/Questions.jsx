import React,{ useState, useEffect } from 'react'
import { Button } from '../Button/Button'
import "./questionsStyle.css"
import { nanoid } from 'nanoid';
export const Questions = () => {
  const [questions, setQuestions] = useState()
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [answerLocked, setAnswerLocked] = useState(false);
  const [count, setCount] = useState(0)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=18");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const questionsWithId = data.results.map(question => ({
          ...question,
          id: nanoid(),
          selected: false,
          selectedAnswer: null,
          shuffledAnswers: shuffleAnswers(
            question.incorrect_answers
              ? [question.correct_answer, ...question.incorrect_answers]
              : []
          )
        }));
        setQuestions(questionsWithId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchQuestions()
  }, []);
 
  const shuffleAnswers = (array) => {
    if (!Array.isArray(array)) {
      return [];
    }
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const selectAnswer = (id, selectedAnswer) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === id
          ? {
              ...question,
              selectedAnswer: selectedAnswer
            }
          : question
      )
    );
    if (!answeredQuestions.includes(id)) {
      setAnsweredQuestions(prevAnsweredQuestions => [
        ...prevAnsweredQuestions,
        id
      ]);
    }
  };
  const checkAnswers = () => {
    setShowResults(true);
    setAnswerLocked(true);
    let correctCount = 0;
    questions.forEach(question => {
      if (question.selectedAnswer === question.correct_answer) {
        correctCount++;
      }
    });
    setCount(correctCount);
  };
  return (
    <div className='main'>
      {questions && questions.map((data) => (
        <div>
          <div>
            <h3 className='questions' key={data.id}>{data.question}</h3>
          </div>
          <div className='answers--div'>
            {data.shuffledAnswers.map((answer) => (
              <div key={answer}>
                <input
                  type="radio"
                  id={`${data.id}-${answer}`}
                  name={data.id}
                  value={answer}
                  checked={data.selectedAnswer === answer}
                  onChange={() => selectAnswer(data.id, answer)}
                  disabled={showResults || answerLocked}
                />
                <label
                  htmlFor={`${data.id}-${answer}`}
                  className={
                    `${
                      showResults && data.correct_answer === answer
                        ? 'highlight-correct'
                        : 'answers--div input'
                    }
                    ${
                      showResults && data.selectedAnswer === answer
                        ? data.selectedAnswer === data.correct_answer
                          ? 'correct'
                          : 'incorrect'
                        : 'answers--div input'}`
                  }>
                    {answer}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      {showResults && <p>You scored ${count}/10 correct answers</p>}
      <Button
        path={showResults ? "/" : "/questions"}
        name={showResults ? "Play again" : "Check Answers" }
        onClick={checkAnswers}/>
    </div>
  )
}