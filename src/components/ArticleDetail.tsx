import { ArrowLeft, Eye, Calendar, User, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  reads: number;
  gradient: string;
  glowbitsReward: number;
  content: string;
  type: "editorial" | "user-generated";
}

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onFinishReading: (glowbits: number) => void;
}

export function ArticleDetail({ article, onBack, onFinishReading }: ArticleDetailProps) {
  const handleFinishReading = () => {
    onFinishReading(article.glowbitsReward);
    onBack();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>

        {/* Article Header */}
        <div 
          className="p-8 rounded-3xl mb-8 text-white"
          style={{ background: article.gradient }}
        >
          <div className="mb-4">
            <span className="px-4 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl mb-6">{article.title}</h1>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{article.reads} pembaca</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <Card className="p-8 rounded-3xl mb-8">
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>

        {/* Finish Reading Button */}
        <Card className="p-6 rounded-3xl bg-gradient-to-r from-orange-100 to-yellow-100 border-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl mb-2">Selesai Membaca?</h3>
              <p className="text-gray-600">
                Dapatkan {article.glowbitsReward} Glowbits sebagai reward!
              </p>
            </div>
            <Button
              onClick={handleFinishReading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-xl px-8 py-6 gap-2"
            >
              <Star className="w-5 h-5" />
              Selesai Baca
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
