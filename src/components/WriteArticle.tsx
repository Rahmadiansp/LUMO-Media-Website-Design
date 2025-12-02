import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { Star, PenLine, Upload, X, ArrowLeft, Loader2, Plus, Trash, Brain } from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  thumbnailUrl?: string | null;
  author: string;
  authorEmail: string;
}

interface WriteArticleProps {
  onSubmit: () => void;
  onCancel: () => void;
  userName: string;
  userEmail?: string;
  editArticle?: Article | null;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export function WriteArticle({ onSubmit, onCancel, userName, userEmail, editArticle }: WriteArticleProps) {
  const [title, setTitle] = useState(editArticle?.title || "");
  const [category, setCategory] = useState(editArticle?.category || "");
  const [content, setContent] = useState(editArticle?.content || "");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(editArticle?.thumbnailUrl || null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [showQuizSection, setShowQuizSection] = useState(false);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title && category && content && content.length >= 100) {
      setIsSubmitting(true);
      setError(null);
      
      try {
        let thumbnailUrl = null;
        
        // Upload thumbnail if exists
        if (thumbnailFile) {
          const formData = new FormData();
          formData.append('file', thumbnailFile);
          
          const uploadResponse = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/upload-thumbnail`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
              },
              body: formData,
            }
          );
          
          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            throw new Error(errorData.error || 'Failed to upload thumbnail');
          }
          
          const uploadData = await uploadResponse.json();
          thumbnailUrl = uploadData.url;
        }
        
        // Create or update article
        const articleResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/articles${editArticle ? `/${editArticle.id}` : ''}`,
          {
            method: editArticle ? 'PUT' : 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title,
              category,
              content,
              author: userName,
              authorEmail: userEmail || userName,
              thumbnailUrl: thumbnailUrl || (thumbnailPreview && !thumbnailFile ? thumbnailPreview : null),
              quizQuestions: showQuizSection && quizQuestions.length > 0 ? quizQuestions : [],
            }),
          }
        );
        
        if (!articleResponse.ok) {
          const errorData = await articleResponse.json();
          throw new Error(errorData.error || 'Failed to create or update article');
        }
        
        const articleData = await articleResponse.json();
        console.log('Article created/updated successfully:', articleData);
        
        setShowSuccess(true);
        setTimeout(() => {
          onSubmit();
        }, 2000);
      } catch (err) {
        console.error('Error submitting article:', err);
        setError(err instanceof Error ? err.message : 'Failed to submit article');
        setIsSubmitting(false);
      }
    }
  };

  const handleAddQuestion = () => {
    setQuizQuestions([...quizQuestions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = quizQuestions.filter((_, i) => i !== index);
    setQuizQuestions(newQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...quizQuestions];
    newQuestions[index].question = value;
    setQuizQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...quizQuestions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuizQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...quizQuestions];
    newQuestions[questionIndex].correctAnswer = optionIndex;
    setQuizQuestions(newQuestions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onCancel}
            variant="ghost"
            className="mb-4 rounded-full hover:bg-white/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <PenLine className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Tulis Berita
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Bagikan ceritamu dan dapatkan +50 Glowbits!
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Card className="mb-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-3xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                <Star className="w-8 h-8 fill-white text-white" />
              </div>
              <div>
                <h3 className="text-xl text-green-900 mb-1">Artikel Berhasil Dikirim!</h3>
                <p className="text-green-700">Kamu mendapatkan +50 Glowbits 🎉</p>
              </div>
            </div>
          </Card>
        )}

        {/* Form */}
        <Card className="p-8 rounded-3xl border-2 border-purple-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Author Info */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-100">
              <p className="text-sm text-gray-600 mb-1">Penulis</p>
              <p className="text-lg">{userName}</p>
            </div>

            {/* Title */}
            <div>
              <label className="block mb-2 text-gray-700">
                Judul Berita <span className="text-red-500">*</span>
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul berita yang menarik dan informatif..."
                className="rounded-xl border-2 border-gray-200 focus:border-purple-400 text-lg p-3"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Buat judul yang menarik perhatian pembaca
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-gray-700">
                Kategori <span className="text-red-500">*</span>
              </label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="rounded-xl border-2 border-gray-200 text-lg p-3 h-auto">
                  <SelectValue placeholder="Pilih kategori berita" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lingkungan">🌱 Lingkungan</SelectItem>
                  <SelectItem value="pendidikan">📚 Pendidikan</SelectItem>
                  <SelectItem value="teknologi">💻 Teknologi</SelectItem>
                  <SelectItem value="olahraga">⚽ Olahraga</SelectItem>
                  <SelectItem value="seni">🎨 Seni & Budaya</SelectItem>
                  <SelectItem value="sosial">🤝 Sosial</SelectItem>
                  <SelectItem value="kesehatan">🏥 Kesehatan</SelectItem>
                  <SelectItem value="ekonomi">💰 Ekonomi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block mb-2 text-gray-700">
                Gambar Thumbnail (Opsional)
              </label>
              {!thumbnailPreview ? (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-gray-700 mb-1">Klik untuk upload gambar</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF hingga 5MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border-2 border-purple-300">
                  <img 
                    src={thumbnailPreview} 
                    alt="Thumbnail preview" 
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveThumbnail}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block mb-2 text-gray-700">
                Isi Berita <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis beritamu di sini...&#10;&#10;Tips:&#10;- Gunakan 5W+1H (What, Who, When, Where, Why, How)&#10;- Tuliskan fakta, bukan opini&#10;- Gunakan bahasa yang mudah dipahami&#10;- Sertakan detail yang penting dan menarik"
                className="min-h-[350px] rounded-xl border-2 border-gray-200 focus:border-purple-400 p-4 text-base"
                required
              />
              <div className="flex items-center justify-between mt-2">
                <p className={`text-sm ${content.length >= 100 ? 'text-green-600' : 'text-gray-500'}`}>
                  {content.length >= 100 ? '✓' : ''} {content.length}/100 karakter minimum
                </p>
                {content.length >= 100 && (
                  <p className="text-sm text-green-600">Siap untuk dikirim!</p>
                )}
              </div>
            </div>

            {/* Quiz Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-blue-600" />
                <h4 className="text-lg">Tambahkan Quiz (Opsional)</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Buat quiz interaktif untuk pembacamu! Semakin banyak pertanyaan, semakin menarik.
              </p>
              
              <Button
                type="button"
                onClick={() => setShowQuizSection(!showQuizSection)}
                variant="outline"
                className="rounded-full border-2 px-6 mb-4"
              >
                {showQuizSection ? 'Sembunyikan' : 'Tampilkan'} Quiz Section
              </Button>

              {showQuizSection && (
                <div className="space-y-6 mt-4">
                  {quizQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-white p-6 rounded-2xl border-2 border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg">Pertanyaan {qIndex + 1}</h5>
                        <Button
                          type="button"
                          onClick={() => handleRemoveQuestion(qIndex)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Pertanyaan</label>
                          <Input
                            value={question.question}
                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                            placeholder="Masukkan pertanyaan quiz..."
                            className="rounded-xl border-2 border-gray-200 focus:border-blue-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-700 mb-2">
                            Pilihan Jawaban (Pilih jawaban yang benar)
                          </label>
                          <div className="space-y-2">
                            {question.options.map((option, oIndex) => (
                              <div key={oIndex} className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name={`correct-${qIndex}`}
                                  checked={question.correctAnswer === oIndex}
                                  onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                                  className="w-5 h-5 text-blue-600"
                                />
                                <Input
                                  value={option}
                                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                  placeholder={`Pilihan ${String.fromCharCode(65 + oIndex)}`}
                                  className="flex-1 rounded-xl border-2 border-gray-200 focus:border-blue-400"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    onClick={handleAddQuestion}
                    variant="outline"
                    className="w-full rounded-full border-2 border-dashed border-purple-300 hover:border-purple-400 hover:bg-purple-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Pertanyaan Quiz
                  </Button>

                  {quizQuestions.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                      <p className="text-sm text-blue-700">
                        ✨ Quiz siap! Pembaca akan mendapatkan Glowbits setelah menyelesaikan quiz ini.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Writing Tips */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-100">
              <h4 className="mb-3 flex items-center gap-2">
                💡 Tips Menulis Berita yang Baik
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 shrink-0">✓</span>
                  <span>Gunakan judul yang menarik dan informatif</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 shrink-0">✓</span>
                  <span>Tuliskan fakta yang akurat, bukan opini pribadi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 shrink-0">✓</span>
                  <span>Sertakan 5W+1H dalam paragraf pembuka</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 shrink-0">✓</span>
                  <span>Gunakan bahasa yang mudah dipahami semua orang</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 shrink-0">✓</span>
                  <span>Cek kembali ejaan dan tata bahasa sebelum mengirim</span>
                </li>
              </ul>
            </div>

            {/* Submit Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-gray-200">
              <div className="flex items-center gap-2 text-purple-600">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className="text-lg">Dapatkan +50 Glowbits!</span>
              </div>
              
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 sm:flex-none rounded-full border-2 px-6"
                  disabled={isSubmitting}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={!title || !category || content.length < 100 || isSubmitting}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Berita'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
