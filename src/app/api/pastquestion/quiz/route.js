import { Respond } from "@/utils/utils";
import CSC280 from "./csc280.json";

const quizData = { csc280: CSC280 };

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");
  const numberOfQuestions = parseInt(searchParams.get("numberOfQuestions"), 10);

  if (!quizData[subject]) {
    return Respond({ error: "Subject not found" },404);
  }

  const shuffledQuizData = shuffleArray(quizData[subject].questions);
  const selectedQuestions = shuffledQuizData.slice(0, numberOfQuestions);

  return Respond({ questions: selectedQuestions },200);
}

export async function POST(request) {
  const {
    subject,
    totalQuestions,
    answers: userAnswers,
  } = await request.json();

  if (!quizData[subject]) {
    return Respond({ error: "Subject not found" },404);
  }

  const results = Object.keys(userAnswers)
    .map((qid, index) => {
      const question = quizData[subject].questions.find(
        (data) => data.id == qid
      );

      if (!question) {
        return null;
      }

      return {
        question_no: index + 1,
        question: question.question,
        userAnswer: userAnswers[qid],
        correctAnswer: question.correct_answer,
        isCorrect: userAnswers[qid] == question.correct_answer,
      };
    })
    .filter((result) => result !== null);

  const score = results.reduce(
    (total, result) => total + (result.isCorrect ? 1 : 0),
    0
  );

  return Respond(
    {
      results,
      score,
      answeredQuestions: Object.keys(userAnswers).length,
      totalQuestions,
    },
    200
  );
}
