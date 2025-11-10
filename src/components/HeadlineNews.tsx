import { Flame, TrendingUp, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  reads: number;
  gradient: string;
  glowbitsReward: number;
  thumbnailUrl?: string;
}

interface HeadlineNewsProps {
  articles: Article[];
  onArticleClick: (article: any) => void;
  categoryImages: Record<string, string>;
}

export function HeadlineNews({ articles, onArticleClick, categoryImages }: HeadlineNewsProps) {
  // Get top 3 most read articles as headlines
  const headlines = [...articles]
    .sort((a, b) => b.reads - a.reads)
    .slice(0, 3);

  const mainHeadline = headlines[0];
  const sideHeadlines = headlines.slice(1, 3);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white">
          <Flame className="w-5 h-5" />
          <span className="font-semibold">Headline Utama</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Headline - Large Card */}
        <div className="lg:col-span-2">
          <Card
            onClick={() => onArticleClick(mainHeadline)}
            className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-2 border-orange-200"
          >
            {/* Background Image */}
            {mainHeadline.thumbnailUrl || categoryImages[mainHeadline.category] ? (
              <>
                <ImageWithFallback 
                  src={mainHeadline.thumbnailUrl || categoryImages[mainHeadline.category]}
                  alt={mainHeadline.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-all"></div>
              </>
            ) : (
              <>
                <div className="absolute inset-0" style={{ background: mainHeadline.gradient }} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
              </>
            )}
            
            <div className="relative p-8 h-[400px] flex flex-col justify-between text-white">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-red-500 text-white border-none rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Trending #1
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 rounded-full px-3 py-1">
                    {mainHeadline.category}
                  </Badge>
                </div>
                
                <h2 className="text-4xl mb-4 leading-tight group-hover:scale-[1.02] transition-transform">
                  {mainHeadline.title}
                </h2>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-white/90">
                    oleh <span className="font-semibold">{mainHeadline.author}</span>
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <span>👁️ {mainHeadline.reads} dibaca</span>
                    <span>📅 {mainHeadline.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-yellow-300">⭐</span>
                  <span className="font-semibold">+{mainHeadline.glowbitsReward} Glowbits</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Side Headlines - Smaller Cards */}
        <div className="lg:col-span-1 space-y-6">
          {sideHeadlines.map((article, index) => (
            <Card
              key={article.id}
              onClick={() => onArticleClick(article)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              {/* Background Image */}
              {article.thumbnailUrl || categoryImages[article.category] ? (
                <>
                  <ImageWithFallback 
                    src={article.thumbnailUrl || categoryImages[article.category]}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-all"></div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0" style={{ background: article.gradient }} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
                </>
              )}
              
              <div className="relative p-6 h-[187px] flex flex-col justify-between text-white">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-orange-500 text-white border-none rounded-full px-2 py-0.5 text-xs flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      #{index + 2}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 rounded-full px-2 py-0.5 text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl mb-2 leading-tight line-clamp-2 group-hover:scale-[1.02] transition-transform">
                    {article.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex flex-col gap-1">
                    <p className="text-white/90 text-xs">oleh {article.author}</p>
                    <span className="text-white/80 text-xs">👁️ {article.reads} dibaca</span>
                  </div>
                  
                  <div className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                    <span className="text-yellow-300">⭐</span>
                    <span>+{article.glowbitsReward}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}