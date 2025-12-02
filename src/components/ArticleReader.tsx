import { useState, useEffect } from "react";
import { ArrowLeft, Star, Eye, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArticleQuiz } from "./ArticleQuiz";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ArticleReaderProps {
  articleId: string;
  onClose: () => void;
  glowbits: number;
  onRewardEarned?: (reward: number) => void;
}

export function ArticleReader({ articleId, onClose, glowbits, onRewardEarned }: ArticleReaderProps) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/articles/${articleId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setArticle(data.article);
        setError(null);
      } else {
        setError('Artikel tidak ditemukan');
      }
    } catch (err) {
      console.error('Error fetching article:', err);
      setError('Gagal memuat artikel');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteArticle = () => {
    // Check if article has quiz
    if (article.quizQuestions && article.quizQuestions.length > 0) {
      setShowQuiz(true);
    } else {
      // No quiz, just give the reading reward and close
      if (onRewardEarned) {
        onRewardEarned(article.glowbitsReward || 5);
      }
      onClose();
    }
  };

  const handleQuizComplete = (score: number, quizReward: number) => {
    // Give both article reading reward and quiz reward
    const totalReward = (article.glowbitsReward || 5) + quizReward;
    if (onRewardEarned) {
      onRewardEarned(totalReward);
    }
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleSkipQuiz = () => {
    // Just give article reading reward
    if (onRewardEarned) {
      onRewardEarned(article.glowbitsReward || 5);
    }
    onClose();
  };

  // Show quiz if enabled
  if (showQuiz && article?.quizQuestions && article.quizQuestions.length > 0) {
    return (
      <ArticleQuiz
        questions={article.quizQuestions}
        onComplete={handleQuizComplete}
        onSkip={handleSkipQuiz}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8">
          <p>Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md">
          <h3 className="text-xl mb-4">Artikel Tidak Ditemukan</h3>
          <p className="text-gray-600 mb-6">{error || 'Maaf, artikel yang Anda cari tidak ditemukan.'}</p>
          <Button onClick={onClose} className="w-full rounded-full bg-[#0360fd] hover:bg-[#0250d0]">
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Baru saja';
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString('id-ID');
  };

  const hasQuiz = article.quizQuestions && article.quizQuestions.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-700 hover:text-[#0360fd] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Thumbnail */}
        {article.thumbnailUrl && (
          <div className="relative h-96 w-full overflow-hidden rounded-3xl mb-8">
            <ImageWithFallback
              src={article.thumbnailUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-[#0360fd] text-white rounded-full">{article.category}</Badge>
          <h1 className="text-4xl md:text-5xl mb-6">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Oleh {article.author}</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.date)}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {article.reads} views
            </div>
          </div>
        </div>
        
        {/* Article Body */}
        <div className="prose prose-lg max-w-none mb-12">
          {article.content.split('\n\n').map((paragraph: string, index: number) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer with reward */}
        <div className="bg-gradient-to-r from-[#0360fd]/10 to-[#fe9ecd]/10 p-6 rounded-3xl border-2 border-[#0360fd]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#ffcf03] rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 fill-[#ff7303] text-[#ff7303]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Selesai baca?</p>
                <p>
                  Dapatkan +{article.glowbitsReward} Glowbits
                  {hasQuiz && <span className="text-[#0360fd]"> + Quiz Bonus!</span>}
                </p>
              </div>
            </div>
            <Button
              onClick={handleCompleteArticle}
              className="bg-[#0360fd] hover:bg-[#0250d0] text-white rounded-full px-8"
            >
              {hasQuiz ? 'Lanjut ke Quiz' : 'Selesai Baca'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
