import { X, Star, Eye, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  reads: number;
  content: string;
  glowbitsReward: number;
}

interface ArticleReaderProps {
  article: Article;
  onClose: () => void;
  onFinishReading: (glowbits: number) => void;
}

export function ArticleReader({ article, onClose, onFinishReading }: ArticleReaderProps) {
  const handleFinishReading = () => {
    onFinishReading(article.glowbitsReward);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between rounded-t-3xl">
          <div className="flex-1">
            <Badge className="mb-3">{article.category}</Badge>
            <h2 className="text-3xl mb-3">{article.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Oleh {article.author}</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.reads} views
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer with reward */}
        <div className="sticky bottom-0 bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 fill-yellow-600 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Selesai baca?</p>
                <p>Dapatkan +{article.glowbitsReward} Glowbits!</p>
              </div>
            </div>
            <Button
              onClick={handleFinishReading}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8"
            >
              Selesai Baca
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
