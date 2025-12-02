import { Card } from "./ui/card";
import { Eye, Heart, MessageCircle, TrendingUp, Award, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
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
  content: string;
  type: "editorial" | "user-generated";
}

interface InsightsProps {
  userName: string;
  userEmail?: string;
}

export function Insights({ userName, userEmail }: InsightsProps) {
  const [userArticles, setUserArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userEmail) {
      fetchUserArticles();
    } else {
      setLoading(false);
    }
  }, [userEmail]);

  const fetchUserArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/${encodeURIComponent(userEmail!)}/articles`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserArticles(data.articles);
      }
    } catch (err) {
      console.error('Error fetching user articles:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const totalReads = userArticles.reduce((sum, article) => sum + article.reads, 0);
  const averageReads = userArticles.length > 0 ? Math.floor(totalReads / userArticles.length) : 0;
  const mostReadArticle = userArticles.reduce((max, article) => 
    article.reads > (max?.reads || 0) ? article : max, userArticles[0]
  );
  const totalGlowbitsEarned = userArticles.length * 50;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">Management Insight</h2>
          <p className="text-gray-600">Lihat performa artikel dan engagementmu</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#0360fd]/10 to-[#0360fd]/5 border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#0360fd] rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl mb-1">{loading ? '-' : userArticles.length}</div>
          <div className="text-sm text-gray-600">Artikel Diterbitkan</div>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#02a356]/10 to-[#02a356]/5 border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#02a356] rounded-2xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl mb-1">{loading ? '-' : totalReads.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Pembaca</div>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#ff7303]/10 to-[#ff7303]/5 border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#ff7303] rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl mb-1">{loading ? '-' : averageReads}</div>
          <div className="text-sm text-gray-600">Rata-rata Pembaca</div>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#ffcf03]/10 to-[#ffcf03]/5 border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#ffcf03] rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl mb-1">{loading ? '-' : totalGlowbitsEarned}</div>
          <div className="text-sm text-gray-600">Total Glowbits</div>
        </Card>
      </div>

      {/* Most Read Article */}
      {mostReadArticle && !loading && (
        <Card className="p-6 rounded-3xl">
          <h3 className="text-xl mb-4">🏆 Artikel Terpopuler</h3>
          <div 
            className="p-6 rounded-2xl mb-4 bg-gradient-to-r from-[#0360fd] to-[#fe9ecd]"
          >
            <div className="text-white">
              <div className="text-sm opacity-90 mb-2">{mostReadArticle.category}</div>
              <h4 className="text-2xl mb-3">{mostReadArticle.title}</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>{mostReadArticle.reads} pembaca</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(mostReadArticle.date)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Articles Performance */}
      <Card className="p-6 rounded-3xl">
        <h3 className="text-xl mb-4">📊 Performa Artikel</h3>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <p>Memuat data artikel...</p>
            </div>
          ) : userArticles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Belum ada artikel yang diterbitkan</p>
              <p className="text-sm mt-2">Mulai tulis artikel pertamamu!</p>
            </div>
          ) : (
            userArticles.map((article) => (
              <div 
                key={article.id} 
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="mb-1">{article.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{formatDate(article.date)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>{article.reads}</span>
                    </div>
                    <div className="text-xs text-gray-500">pembaca</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-[#ff7303]">
                      <Award className="w-4 h-4" />
                      <span>+{article.glowbitsReward}</span>
                    </div>
                    <div className="text-xs text-gray-500">glowbits</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Engagement Tips */}
      <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#fe9ecd]/10 to-[#0360fd]/10 border-0">
        <h3 className="text-xl mb-4">💡 Tips Meningkatkan Engagement</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#0360fd] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">1</span>
            </div>
            <div>
              <h4 className="mb-1">Tulis Judul yang Menarik</h4>
              <p className="text-sm text-gray-600">Judul yang catchy akan meningkatkan jumlah pembaca</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#fe9ecd] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">2</span>
            </div>
            <div>
              <h4 className="mb-1">Pilih Topik yang Relevan</h4>
              <p className="text-sm text-gray-600">Tulis tentang hal-hal yang sedang trending atau dekat dengan pembaca</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#ff7303] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">3</span>
            </div>
            <div>
              <h4 className="mb-1">Konsisten Menulis</h4>
              <p className="text-sm text-gray-600">Semakin sering menulis, semakin besar audiensmu!</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}