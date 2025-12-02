import { useState, useEffect } from "react";
import { NewsCard } from "./NewsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Loader2 } from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

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

interface FeedsProps {
  onReadArticle: (articleId: string) => void;
}

// Mock editorial articles with thumbnails
const mockEditorialArticles: Article[] = [
  {
    id: "editorial-1",
    title: "Siswa SMA di Jakarta Ciptakan Aplikasi Pendeteksi Hoax Berbasis AI",
    author: "Redaksi LUMO",
    category: "Teknologi",
    date: "2 jam lalu",
    reads: 15234,
    glowbitsReward: 5,
    content: "Panduan lengkap menulis berita yang baik...",
    type: "editorial",
    thumbnailUrl: "https://images.unsplash.com/photo-1596495717678-69df9f89c2a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc2Nob29sJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzY0NTcyMjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "editorial-2",
    title: "Komunitas Remaja Surabaya Gelar Aksi Bersih Pantai Terbesar",
    author: "Redaksi LUMO",
    category: "Lingkungan",
    date: "5 jam lalu",
    reads: 12456,
    glowbitsReward: 5,
    content: "Cerita seru perjalanan saya...",
    type: "editorial",
    thumbnailUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwY2xlYW51cCUyMGJlYWNofGVufDF8fHx8MTc2NDU3MjI4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "editorial-3",
    title: "Festival Musik Indie Remaja Bandung Dongkrak Ekonomi Lokal",
    author: "Redaksi LUMO",
    category: "Budaya",
    date: "1 hari lalu",
    reads: 10234,
    glowbitsReward: 5,
    content: "Tips dan trik belajar efektif...",
    type: "editorial",
    thumbnailUrl: "https://images.unsplash.com/photo-1612729829113-59e5c3a3d107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwaW5kaWV8ZW58MXx8fHwxNzY0NTcyMjg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "editorial-4",
    title: "Tutorial: Cara Menulis Berita yang Menarik dan Faktual",
    author: "Redaksi LUMO",
    category: "Edukasi",
    date: "3 jam lalu",
    reads: 8765,
    glowbitsReward: 5,
    content: "Panduan lengkap menulis berita yang baik...",
    type: "editorial",
    thumbnailUrl: "https://images.unsplash.com/photo-1763271206710-1c5d8590a19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMG5ld3MlMjByZWFkaW5nfGVufDF8fHx8MTc2NDU3MjI4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "editorial-5",
    title: "Wawancara Eksklusif: Founder Startup EdTech Termuda Indonesia",
    author: "Redaksi LUMO",
    category: "Inspirasi",
    date: "12 jam lalu",
    reads: 9876,
    glowbitsReward: 5,
    content: "Mengenal lebih dekat...",
    type: "editorial",
    thumbnailUrl: "https://images.unsplash.com/photo-1589395937658-0557e7d89fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc2NDUxOTE0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "editorial-6",
    title: "Mengenal Literasi Digital: Panduan Lengkap untuk Remaja",
    author: "Redaksi LUMO",
    category: "Teknologi",
    date: "1 hari lalu",
    reads: 7654,
    glowbitsReward: 5,
    content: "Di era digital ini...",
    type: "editorial",
    thumbnailUrl: "https://images.unsplash.com/photo-1596495717678-69df9f89c2a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc2Nob29sJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzY0NTcyMjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function Feeds({ onReadArticle }: FeedsProps) {
  const [userArticles, setUserArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserArticles();
  }, []);

  const fetchUserArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/articles`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json();
      
      // Transform API data to match Article interface
      const transformedArticles = data.articles.map((article: any) => ({
        ...article,
        date: formatDate(article.date),
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // fallback gradient
      }));
      
      setUserArticles(transformedArticles);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
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

  const allArticles = [...userArticles, ...mockEditorialArticles];
  const editorialArticles = mockEditorialArticles;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
          Feeds Berita
        </h1>
        <p className="text-lg text-gray-600">
          Jelajahi berita terbaru dari redaksi LUMO dan komunitas
        </p>
      </div>

      {/* Berita Section dengan Tabs */}
      <div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 rounded-2xl p-1 bg-gray-100">
            <TabsTrigger value="all" className="rounded-xl">
              Semua Berita
            </TabsTrigger>
            <TabsTrigger value="editorial" className="rounded-xl">
              Redaksi LUMO
            </TabsTrigger>
            <TabsTrigger value="user" className="rounded-xl">
              Dari Pembaca
            </TabsTrigger>
          </TabsList>

          {/* All Articles */}
          <TabsContent value="all" className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-600">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onClick={() => onReadArticle(article.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Editorial Articles */}
          <TabsContent value="editorial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editorialArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onClick={() => onReadArticle(article.id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* User Generated Articles */}
          <TabsContent value="user" className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : userArticles.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Belum ada artikel dari pembaca.</p>
                <p className="text-sm mt-2">Jadilah yang pertama menulis artikel!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    onClick={() => onReadArticle(article.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}