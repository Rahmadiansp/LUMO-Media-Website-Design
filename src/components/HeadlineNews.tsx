import { useState, useEffect } from "react";
import { Flame, TrendingUp, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { projectId, publicAnonKey } from '../utils/supabase/info';

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
  onReadArticle: (articleId: string) => void;
}

// Mock data for headlines with thumbnails
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Siswa SMA di Jakarta Ciptakan Aplikasi Pendeteksi Hoax Berbasis AI",
    author: "Rani Putri",
    category: "Teknologi",
    date: "2 jam lalu",
    reads: 15234,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    glowbitsReward: 5,
    thumbnailUrl: "https://images.unsplash.com/photo-1596495717678-69df9f89c2a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc2Nob29sJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzY0NTcyMjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "2",
    title: "Komunitas Remaja Surabaya Gelar Aksi Bersih Pantai Terbesar",
    author: "Budi Santoso",
    category: "Lingkungan",
    date: "5 jam lalu",
    reads: 12456,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    glowbitsReward: 5,
    thumbnailUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwY2xlYW51cCUyMGJlYWNofGVufDF8fHx8MTc2NDU3MjI4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "3",
    title: "Festival Musik Indie Remaja Bandung Dongkrak Ekonomi Lokal",
    author: "Siti Aminah",
    category: "Budaya",
    date: "1 hari lalu",
    reads: 10234,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    glowbitsReward: 5,
    thumbnailUrl: "https://images.unsplash.com/photo-1612729829113-59e5c3a3d107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwaW5kaWV8ZW58MXx8fHwxNzY0NTcyMjg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function HeadlineNews({ onReadArticle }: HeadlineNewsProps) {
  const [userArticles, setUserArticles] = useState<Article[]>([]);
  
  useEffect(() => {
    fetchTopArticles();
  }, []);

  const fetchTopArticles = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/articles`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const transformedArticles = data.articles.map((article: any) => ({
          ...article,
          date: formatDate(article.date),
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }));
        setUserArticles(transformedArticles.slice(0, 3)); // Get top 3
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
    }
  };

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

  // Combine user articles with mock articles
  const allArticles = [...userArticles, ...mockArticles];
  const headlines = allArticles.slice(0, 3);

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
            onClick={() => onReadArticle(mainHeadline.id)}
            className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-2 border-orange-200"
          >
            {/* Background Image or Gradient */}
            {mainHeadline.thumbnailUrl ? (
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={mainHeadline.thumbnailUrl}
                  alt={mainHeadline.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="absolute inset-0" style={{ background: mainHeadline.gradient }} />
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
            
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
                
                <h2 className="text-4xl mb-4 leading-tight group-hover:scale-[1.02] transition-transform drop-shadow-lg">
                  {mainHeadline.title}
                </h2>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-white/90 drop-shadow-md">
                    oleh <span className="font-semibold">{mainHeadline.author}</span>
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/80 drop-shadow-md">
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
              onClick={() => onReadArticle(article.id)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              {/* Background Image or Gradient */}
              {article.thumbnailUrl ? (
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={article.thumbnailUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="absolute inset-0" style={{ background: article.gradient }} />
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
              
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
                  
                  <h3 className="text-xl mb-2 leading-tight line-clamp-2 group-hover:scale-[1.02] transition-transform drop-shadow-lg">
                    {article.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex flex-col gap-1">
                    <p className="text-white/90 text-xs drop-shadow-md">oleh {article.author}</p>
                    <span className="text-white/80 text-xs drop-shadow-md">👁️ {article.reads} dibaca</span>
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