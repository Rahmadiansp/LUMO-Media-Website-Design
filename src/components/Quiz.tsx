import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Brain, CheckCircle2, XCircle, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  onCompleteQuiz: (score: number, reward: number) => void;
}

export function Quiz({ onCompleteQuiz }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const questions: QuizQuestion[] = [
    {
      id: "q1",
      question: "Apa yang dimaksud dengan jurnalisme partisipatif?",
      options: [
        "Jurnalisme yang hanya dilakukan oleh wartawan profesional",
        "Jurnalisme yang melibatkan masyarakat dalam pembuatan berita",
        "Jurnalisme yang hanya membahas topik politik",
        "Jurnalisme yang tidak memerlukan fakta"
      ],
      correctAnswer: 1,
      explanation: "Jurnalisme partisipatif adalah konsep di mana masyarakat umum turut berkontribusi dalam pembuatan dan penyebaran berita, bukan hanya wartawan profesional."
    },
    {
      id: "q2",
      question: "Mengapa penting untuk mengecek fakta sebelum membagikan berita?",
      options: [
        "Agar terlihat pintar",
        "Untuk mendapatkan lebih banyak like",
        "Untuk mencegah penyebaran informasi yang salah (hoaks)",
        "Karena diwajibkan oleh hukum"
      ],
      correctAnswer: 2,
      explanation: "Mengecek fakta sangat penting untuk mencegah penyebaran hoaks dan memastikan informasi yang kita bagikan akurat dan dapat dipercaya."
    },
    {
      id: "q3",
      question: "Apa itu clickbait dalam jurnalisme?",
      options: [
        "Judul berita yang menarik dan informatif",
        "Teknik menulis berita yang objektif",
        "Judul yang menyesatkan untuk mendapatkan klik",
        "Cara mengedit foto berita"
      ],
      correctAnswer: 2,
      explanation: "Clickbait adalah judul yang dirancang untuk menarik perhatian dan mendorong orang mengklik, seringkali dengan cara yang menyesatkan atau berlebihan."
    },
    {
      id: "q4",
      question: "Apa prinsip 5W+1H dalam penulisan berita?",
      options: [
        "What, When, Where, Who, Why, How",
        "Write, Wait, Watch, Work, Win, Help",
        "Word, Website, Writer, World, Way, Hope",
        "Wake, Walk, Want, Work, Wish, Happy"
      ],
      correctAnswer: 0,
      explanation: "5W+1H adalah prinsip dasar penulisan berita: What (Apa), When (Kapan), Where (Di mana), Who (Siapa), Why (Mengapa), dan How (Bagaimana)."
    },
    {
      id: "q5",
      question: "Mengapa penting untuk mencantumkan sumber dalam artikel berita?",
      options: [
        "Untuk membuat artikel terlihat lebih panjang",
        "Untuk menunjukkan kredibilitas dan memungkinkan pembaca melakukan verifikasi",
        "Karena semua orang melakukannya",
        "Untuk mengisi ruang kosong"
      ],
      correctAnswer: 1,
      explanation: "Mencantumkan sumber sangat penting untuk menunjukkan kredibilitas informasi dan memungkinkan pembaca memverifikasi fakta secara independen."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setAnsweredQuestions(prev => [...prev, answerIndex === questions[currentQuestionIndex].correctAnswer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      const reward = score * 20; // 20 glowbits per correct answer
      onCompleteQuiz(score, reward);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setAnsweredQuestions([]);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const totalReward = score * 20;

  if (quizCompleted) {
    return (
      <Card className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <div className="mb-6">
            <div className="inline-flex p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl mb-2">Quiz Selesai!</h3>
            <p className="text-gray-600">Kamu berhasil menyelesaikan quiz literasi media</p>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-purple-200">
            <div className="text-4xl mb-2">{score}/{questions.length}</div>
            <p className="text-gray-600 mb-4">Jawaban Benar</p>
            
            <div className="flex items-center justify-center gap-2 text-amber-600">
              <Star className="w-6 h-6 fill-amber-400" />
              <span className="text-2xl">+{totalReward} Glowbits</span>
            </div>
          </div>

          <div className="space-y-3">
            {score === questions.length && (
              <p className="text-green-600 p-3 bg-green-50 rounded-xl">
                🎉 Sempurna! Kamu adalah ahli literasi media!
              </p>
            )}
            {score >= questions.length * 0.6 && score < questions.length && (
              <p className="text-blue-600 p-3 bg-blue-50 rounded-xl">
                👏 Bagus! Terus tingkatkan pemahamanmu!
              </p>
            )}
            {score < questions.length * 0.6 && (
              <p className="text-orange-600 p-3 bg-orange-50 rounded-xl">
                💪 Jangan menyerah! Coba lagi untuk hasil yang lebih baik!
              </p>
            )}

            <Button
              onClick={handleRestartQuiz}
              className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Ulangi Quiz
            </Button>
          </div>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl">Quiz Literasi Media</h3>
          <p className="text-sm text-gray-600">Dapatkan hingga {questions.length * 20} Glowbits!</p>
        </div>
        <div className="text-sm px-3 py-1 bg-white rounded-full border-2 border-purple-200">
          {currentQuestionIndex + 1}/{questions.length}
        </div>
      </div>

      <motion.div
        key={currentQuestionIndex}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="space-y-4"
      >
        <div className="p-4 bg-white rounded-2xl border-2 border-purple-200">
          <p className="text-lg">{currentQuestion.question}</p>
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
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  showCorrect
                    ? "bg-green-50 border-green-400"
                    : showIncorrect
                    ? "bg-red-50 border-red-400"
                    : isSelected
                    ? "bg-purple-50 border-purple-400"
                    : "bg-white border-gray-200 hover:border-purple-300"
                } ${selectedAnswer !== null ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    showCorrect
                      ? "bg-green-500 border-green-500"
                      : showIncorrect
                      ? "bg-red-500 border-red-500"
                      : isSelected
                      ? "bg-purple-500 border-purple-500"
                      : "border-gray-300"
                  }`}>
                    {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                    {showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                  </div>
                  <span className={showCorrect || showIncorrect ? "" : ""}>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`p-4 rounded-xl ${
              selectedAnswer === currentQuestion.correctAnswer
                ? "bg-green-50 border-2 border-green-300"
                : "bg-blue-50 border-2 border-blue-300"
            }`}
          >
            <p className="text-sm mb-3">
              <span className="font-medium">Penjelasan: </span>
              {currentQuestion.explanation}
            </p>
            <Button
              onClick={handleNextQuestion}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {currentQuestionIndex < questions.length - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil"}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </Card>
  );
}
