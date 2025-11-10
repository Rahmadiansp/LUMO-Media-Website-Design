import { Eye, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NewsCardProps {
  title: string;
  author: string;
  reads: number;
  gradient: string;
  category: string;
  earnedGlowbits?: number;
  onClick: () => void;
  imageUrl?: string;
}

export function NewsCard({ 
  title, 
  author, 
  reads, 
  gradient, 
  category,
  earnedGlowbits,
  onClick,
  imageUrl
}: NewsCardProps) {
  return (
    <div 
      className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
      onClick={onClick}
    >
      {/* Background Image with Overlay */}
      {imageUrl ? (
        <>
          <ImageWithFallback 
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </>
      ) : (
        <div className="absolute inset-0" style={{ background: gradient }} />
      )}

      {/* Content */}
      <div className="relative p-6 h-48 flex flex-col justify-between">
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