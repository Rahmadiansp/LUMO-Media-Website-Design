import { Eye, Star } from "lucide-react";
import { Badge } from "./ui/badge";

interface NewsCardProps {
  title: string;
  author: string;
  reads: number;
  gradient: string;
  category: string;
  earnedGlowbits?: number;
  onClick: () => void;
}

export function NewsCard({ 
  title, 
  author, 
  reads, 
  gradient, 
  category,
  earnedGlowbits,
  onClick 
}: NewsCardProps) {
  return (
    <div 
      className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onClick={onClick}
      style={{ background: gradient }}
    >
      <div className="p-6 h-48 flex flex-col justify-between">
        <div>
          <Badge className="bg-white/90 text-gray-800 hover:bg-white mb-3">
            {category}
          </Badge>
          <h3 className="text-white text-xl line-clamp-3">
            {title}
          </h3>
        </div>
        
        <div className="flex items-center justify-between text-white/90 text-sm">
          <span>Karya {author}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{reads}</span>
            </div>
            {earnedGlowbits && (
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <span>+{earnedGlowbits}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
