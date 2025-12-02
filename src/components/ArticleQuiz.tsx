import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Brain, CheckCircle2, XCircle, Star } from "lucide-react";
import { motion } from "motion/react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ArticleQuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, reward: number) => void;
  onSkip: () => void;
}

export function ArticleQuiz({ questions, onComplete, onSkip }: ArticleQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      const reward = score * 10; // 10 glowbits per correct answer
      onComplete(score, reward);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (quizCompleted) {
    const totalReward = score * 10;
    
    return (
      <div className="bg-white min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 max-w-2xl w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="mb-6">
              <div className="inline-flex p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl mb-2">Quiz Selesai!</h3>
              <p className="text-gray-600">Terima kasih sudah mengikuti quiz artikel ini</p>
            </div>

            <div className="bg-white rounded-2xl p-8 mb-6 border-2 border-purple-200">
              <div className="text-5xl mb-3">{score}/{questions.length}</div>
              <p className="text-gray-600 mb-6">Jawaban Benar</p>
              
              <div className="flex items-center justify-center gap-2 text-amber-600">
                <Star className="w-8 h-8 fill-amber-400" />
                <span className="text-3xl">+{totalReward} Glowbits</span>
              </div>
            </div>

            {score === questions.length && (
              <p className="text-green-600 text-lg p-4 bg-green-50 rounded-xl mb-4">
                🎉 Sempurna! Kamu benar-benar memahami artikel ini!
              </p>
            )}
            {score >= questions.length * 0.6 && score < questions.length && (
              <p className="text-blue-600 text-lg p-4 bg-blue-50 rounded-xl mb-4">
                👏 Bagus! Pemahaman yang baik!
              </p>
            )}
            {score < questions.length * 0.6 && (
              <p className="text-orange-600 text-lg p-4 bg-orange-50 rounded-xl mb-4">
                💪 Coba baca artikelnya lagi untuk hasil yang lebih baik!
              </p>
            )}
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <Card className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl">Quiz Artikel</h3>
              <p className="text-sm text-gray-600">Dapatkan hingga {questions.length * 10} Glowbits!</p>
            </div>
          </div>
          <div className="text-sm px-4 py-2 bg-white rounded-full border-2 border-purple-200">
            {currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>

        <motion.div
          key={currentQuestionIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-6"
        >
          <div className="p-6 bg-white rounded-2xl border-2 border-purple-200">
            <p className="text-xl">{currentQuestion.question}</p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
                    showCorrect
                      ? "bg-green-50 border-green-400"
                      : showIncorrect
                      ? "bg-red-50 border-red-400"
                      : isSelected
                      ? "bg-purple-50 border-purple-400"
                      : "bg-white border-gray-200 hover:border-purple-300"
                  } ${selectedAnswer !== null ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      showCorrect
                        ? "bg-green-500 border-green-500"
                        : showIncorrect
                        ? "bg-red-500 border-red-500"
                        : isSelected
                        ? "bg-purple-500 border-purple-500"
                        : "border-gray-300"
                    }`}>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                      {showIncorrect && <XCircle className="w-5 h-5 text-white" />}
                      {!showCorrect && !showIncorrect && (
                        <span className={isSelected ? "text-white" : "text-gray-500"}>{String.fromCharCode(65 + index)}</span>
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Button
                onClick={handleNextQuestion}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg py-6"
              >
                {currentQuestionIndex < questions.length - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil"}
              </Button>
            </motion.div>
          )}
        </motion.div>

        {!showResult && (
          <div className="mt-6 text-center">
            <Button
              onClick={onSkip}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              Lewati Quiz
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
