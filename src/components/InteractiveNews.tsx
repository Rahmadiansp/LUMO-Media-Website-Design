import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Sparkles, TrendingUp, CheckCircle2, XCircle, Vote } from "lucide-react";
import { toast } from "sonner";

interface InteractiveNewsProps {
  onEarnGlowbits: (amount: number) => void;
}

export function InteractiveNews({ onEarnGlowbits }: InteractiveNewsProps) {
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [currentQuizAnswers, setCurrentQuizAnswers] = useState<{[key: string]: string}>({});

  const handlePollVote = (pollId: string, option: string) => {
    setSelectedPoll(pollId + "-" + option);
    onEarnGlowbits(5);
    toast.success("Terima kasih sudah voting! +5 Glowbits", {
      description: "Lihat hasil polling real-time",
    });
  };

  const handleQuizAnswer = (quizId: string, questionId: string, answer: string) => {
    setCurrentQuizAnswers(prev => ({
      ...prev,
      [quizId + "-" + questionId]: answer
    }));
  };

  const handleSubmitQuiz = (quizId: string, correctAnswers: {[key: string]: string}) => {
    let score = 0;
    Object.keys(correctAnswers).forEach((qId) => {
      if (currentQuizAnswers[quizId + "-" + qId] === correctAnswers[qId]) {
        score++;
      }
    });
    
    const reward = score * 5;
    setCompletedQuizzes(prev => [...prev, quizId]);
    onEarnGlowbits(reward);
    
    toast.success(`Quiz selesai! Skor: ${score}/${Object.keys(correctAnswers).length}`, {
      description: `+${reward} Glowbits earned!`,
    });
  };

  const pollResults = {
    "poll1-a": 145,
    "poll1-b": 234,
    "poll1-c": 89,
    "poll1-d": 67,
  };

  const totalVotes = Object.values(pollResults).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white mb-4">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Berita Interaktif & Quiz</span>
        </div>
        <h1 className="text-4xl mb-3">Belajar Sambil Main!</h1>
        <p className="text-gray-600">Baca berita, ikut polling, dan jawab quiz untuk dapat Glowbits</p>
      </div>

      {/* Interactive Story 1: Poll */}
      <Card className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-purple-500 text-white rounded-full">
            <Vote className="w-3 h-3 mr-1" />
            Polling
          </Badge>
          <Badge className="bg-green-500 text-white rounded-full">+5 Glowbits</Badge>
        </div>

        <h2 className="text-3xl mb-4">Medsos Favoritmu untuk Cari Berita?</h2>
        
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700">
            Generasi Z mengubah cara kita mengonsumsi berita. Menurut survei terbaru, 
            lebih dari 70% remaja Indonesia mendapatkan berita dari media sosial. 
            Platform seperti Instagram, TikTok, dan Twitter menjadi sumber informasi utama.
          </p>
          <p className="text-gray-700">
            Namun, ada kekhawatiran tentang penyebaran hoaks dan misinformasi. 
            Penting bagi kita untuk selalu cek fakta dan membaca dari sumber terpercaya!
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-purple-300">
          <h3 className="text-xl mb-4">📊 Polling: Dari mana kamu biasa baca berita?</h3>
          
          <div className="space-y-3">
            {[
              { id: "a", label: "Instagram", emoji: "📸" },
              { id: "b", label: "TikTok", emoji: "🎵" },
              { id: "c", label: "Twitter/X", emoji: "🐦" },
              { id: "d", label: "Website Berita", emoji: "🌐" },
            ].map((option) => {
              const votes = pollResults[`poll1-${option.id}` as keyof typeof pollResults] || 0;
              const percentage = selectedPoll ? Math.round((votes / totalVotes) * 100) : 0;
              const isSelected = selectedPoll === `poll1-${option.id}`;
              
              return (
                <div key={option.id} className="space-y-2">
                  <Button
                    onClick={() => handlePollVote("poll1", option.id)}
                    disabled={selectedPoll !== null}
                    variant={isSelected ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3 rounded-xl"
                  >
                    <span className="mr-2">{option.emoji}</span>
                    <span className="flex-1">{option.label}</span>
                    {selectedPoll && (
                      <span className="font-semibold">{percentage}%</span>
                    )}
                  </Button>
                  {selectedPoll && (
                    <Progress value={percentage} className="h-2" />
                  )}
                </div>
              );
            })}
          </div>

          {selectedPoll && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-sm text-green-800">
                ✅ Terima kasih sudah voting! Total: {totalVotes} suara
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Interactive Story 2: Inline Quiz */}
      <Card className="p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-orange-500 text-white rounded-full">
            <Sparkles className="w-3 h-3 mr-1" />
            Quiz Berita
          </Badge>
          <Badge className="bg-green-500 text-white rounded-full">+15 Glowbits</Badge>
        </div>

        <h2 className="text-3xl mb-4">AI di Dunia Pendidikan: Peluang atau Ancaman?</h2>
        
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700">
            <strong>Jakarta, 20 Oktober 2025</strong> - Kecerdasan buatan (AI) semakin banyak 
            digunakan dalam dunia pendidikan. Dari ChatGPT yang membantu siswa belajar, 
            hingga sistem pembelajaran adaptif yang menyesuaikan materi dengan kemampuan masing-masing siswa.
          </p>
          <p className="text-gray-700">
            Beberapa sekolah di Indonesia mulai mengintegrasikan AI dalam proses belajar mengajar. 
            Menurut Dr. Budi Santoso, ahli teknologi pendidikan dari Universitas Indonesia, 
            "AI bisa menjadi asisten guru yang membantu memberikan perhatian personal ke setiap siswa."
          </p>
          <p className="text-gray-700">
            Namun, ada juga kekhawatiran. Ketergantungan berlebihan pada AI bisa mengurangi 
            kemampuan berpikir kritis siswa. Selain itu, tidak semua sekolah memiliki akses 
            teknologi yang sama, yang bisa memperlebar kesenjangan pendidikan.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-orange-300">
          <h3 className="text-xl mb-4">🎯 Test Pemahamanmu!</h3>
          
          {!completedQuizzes.includes("quiz1") ? (
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="space-y-3">
                <p className="font-semibold">1. Siapa ahli yang diwawancara dalam berita ini?</p>
                {[
                  { id: "a", text: "Dr. Andi Wijaya" },
                  { id: "b", text: "Dr. Budi Santoso" },
                  { id: "c", text: "Prof. Siti Rahayu" },
                ].map(option => (
                  <Button
                    key={option.id}
                    onClick={() => handleQuizAnswer("quiz1", "q1", option.id)}
                    variant={currentQuizAnswers["quiz1-q1"] === option.id ? "default" : "outline"}
                    className="w-full justify-start text-left rounded-xl"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>

              {/* Question 2 */}
              <div className="space-y-3">
                <p className="font-semibold">2. Apa salah satu manfaat AI dalam pendidikan menurut berita?</p>
                {[
                  { id: "a", text: "Menggantikan guru sepenuhnya" },
                  { id: "b", text: "Memberikan perhatian personal ke setiap siswa" },
                  { id: "c", text: "Membuat pelajaran lebih mudah" },
                ].map(option => (
                  <Button
                    key={option.id}
                    onClick={() => handleQuizAnswer("quiz1", "q2", option.id)}
                    variant={currentQuizAnswers["quiz1-q2"] === option.id ? "default" : "outline"}
                    className="w-full justify-start text-left rounded-xl"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>

              {/* Question 3 */}
              <div className="space-y-3">
                <p className="font-semibold">3. Apa kekhawatiran yang disebutkan tentang penggunaan AI?</p>
                {[
                  { id: "a", text: "AI terlalu mahal" },
                  { id: "b", text: "Mengurangi kemampuan berpikir kritis" },
                  { id: "c", text: "AI tidak akurat" },
                ].map(option => (
                  <Button
                    key={option.id}
                    onClick={() => handleQuizAnswer("quiz1", "q3", option.id)}
                    variant={currentQuizAnswers["quiz1-q3"] === option.id ? "default" : "outline"}
                    className="w-full justify-start text-left rounded-xl"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>

              <Button
                onClick={() => handleSubmitQuiz("quiz1", { q1: "b", q2: "b", q3: "b" })}
                disabled={Object.keys(currentQuizAnswers).filter(k => k.startsWith("quiz1")).length < 3}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl py-6"
              >
                Submit Quiz
              </Button>
            </div>
          ) : (
            <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="font-semibold text-green-800">Quiz Sudah Selesai!</p>
              <p className="text-sm text-green-700">Glowbits sudah ditambahkan ke akun kamu</p>
            </div>
          )}
        </div>
      </Card>

      {/* Interactive Story 3: Timeline Quiz */}
      <Card className="p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-green-500 text-white rounded-full">
            <TrendingUp className="w-3 h-3 mr-1" />
            Fact Check
          </Badge>
          <Badge className="bg-green-500 text-white rounded-full">+10 Glowbits</Badge>
        </div>

        <h2 className="text-3xl mb-4">Cara Mengenali Berita Hoaks</h2>
        
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700">
            Di era digital, berita hoaks menyebar lebih cepat dari sebelumnya. Sebagai generasi 
            digital native, penting bagi kita untuk bisa membedakan berita asli dan hoaks.
          </p>
          
          <div className="bg-white p-6 rounded-2xl border-2 border-green-300 my-6">
            <h3 className="text-xl mb-4">✅ 5 Cara Cek Fakta Berita:</h3>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-gray-800">
                <strong>Cek Sumbernya</strong> - Apakah dari media terpercaya?
              </li>
              <li className="text-gray-800">
                <strong>Lihat Tanggalnya</strong> - Berita lama sering di-recycle sebagai berita baru
              </li>
              <li className="text-gray-800">
                <strong>Cari Bukti</strong> - Apakah ada foto/video pendukung yang asli?
              </li>
              <li className="text-gray-800">
                <strong>Cross-Check</strong> - Cek di media lain, apakah memberitakan hal yang sama?
              </li>
              <li className="text-gray-800">
                <strong>Jangan Langsung Share</strong> - Pastikan dulu kebenarannya!
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border-2 border-green-300">
          <h3 className="text-xl mb-4">🔍 Quiz: Mana yang Hoaks?</h3>
          
          {!completedQuizzes.includes("quiz2") ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="font-semibold">Judul Berita: "Minum Air Es Setelah Makan Bikin Kanker!"</p>
                <p className="text-sm text-gray-600">Apa yang mencurigakan dari judul ini?</p>
                {[
                  { id: "a", text: "Tidak ada sumber ilmiah yang disebutkan" },
                  { id: "b", text: "Menggunakan tanda seru berlebihan" },
                  { id: "c", text: "Membuat klaim kesehatan yang menakut-nakuti" },
                  { id: "d", text: "Semua di atas" },
                ].map(option => (
                  <Button
                    key={option.id}
                    onClick={() => handleQuizAnswer("quiz2", "q1", option.id)}
                    variant={currentQuizAnswers["quiz2-q1"] === option.id ? "default" : "outline"}
                    className="w-full justify-start text-left rounded-xl"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>

              <Button
                onClick={() => handleSubmitQuiz("quiz2", { q1: "d" })}
                disabled={!currentQuizAnswers["quiz2-q1"]}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl py-6"
              >
                Submit Quiz
              </Button>
            </div>
          ) : (
            <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="font-semibold text-green-800">Benar! Semua ciri-ciri di atas adalah red flag dari berita hoaks!</p>
            </div>
          )}
        </div>
      </Card>

      {/* Tips Section */}
      <Card className="p-8 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <h3 className="text-2xl mb-4">💡 Tips Jurnalis LUMO</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <p className="font-semibold mb-2">📰 Saat Menulis Berita</p>
            <p className="text-sm text-white/90">
              Selalu cantumkan sumber dan fakta yang bisa diverifikasi
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <p className="font-semibold mb-2">🔍 Saat Membaca Berita</p>
            <p className="text-sm text-white/90">
              Jangan percaya mentah-mentah, selalu cek faktanya dulu!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
