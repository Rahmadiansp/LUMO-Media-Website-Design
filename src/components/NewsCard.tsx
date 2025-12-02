import { Eye, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  reads: number;
  gradient?: string;
  glowbitsReward: number;
  content: string;
  type: "editorial" | "user-generated";
  thumbnailUrl?: string;
}

interface NewsCardProps {
  article: Article;
  onClick: () => void;
}

export function NewsCard({ article, onClick }: NewsCardProps) {
  return (
    <div 
      className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative bg-white"
      onClick={onClick}
    >
      {/* Thumbnail or Gradient Background */}
      {article.thumbnailUrl ? (
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      ) : (
        <div className="relative h-48">
          <div className="absolute inset-0" style={{ background: article.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-white/90 text-gray-800 hover:bg-white">
              {article.category}
            </Badge>
            {article.type === "editorial" && (
              <Badge className="bg-purple-600 text-white">
                Redaksi
              </Badge>
            )}
          </div>
          <h3 className="text-white text-xl line-clamp-3 drop-shadow-lg">
            {article.title}
          </h3>
        </div>
        
        <div className="flex items-center justify-between text-white/90 text-sm">
          <span className="drop-shadow-md">Karya {article.author}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
              <Eye className="w-4 h-4" />
              <span>{article.reads}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span>+{article.glowbitsReward}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}