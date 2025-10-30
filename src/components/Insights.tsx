import { Card } from "./ui/card";
import { Eye, Heart, MessageCircle, TrendingUp, Award, Calendar } from "lucide-react";

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
  publishedArticles: Article[];
  totalGlowbitsEarned: number;
}

export function Insights({ publishedArticles, totalGlowbitsEarned }: InsightsProps) {
  const userArticles = publishedArticles.filter(article => article.author === "Kamu");
  const totalReads = userArticles.reduce((sum, article) => sum + article.reads, 0);
  const averageReads = userArticles.length > 0 ? Math.floor(totalReads / userArticles.length) : 0;
  const mostReadArticle = userArticles.reduce((max, article) => 
    article.reads > (max?.reads || 0) ? article : max, userArticles[0]
  );

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
        <Card className="p-6 rounded-3xl bg-gradient-to-br from-purple-100 to-purple-50 border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl mb-1">{userArticles.length}</div>
          <div className="text-sm text-gray-600">Artikel Diterbitkan</div>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-to-br from-blue-100 to-blue-50 border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl mb-1">{totalReads.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Pembaca</div>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-to-br from-green-100 to-green-50 border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl mb-1">{averageReads}</div>
          <div className="text-sm text-gray-600">Rata-rata Pembaca</div>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-to-br from-orange-100 to-orange-50 border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl mb-1">{totalGlowbitsEarned}</div>
          <div className="text-sm text-gray-600">Total Glowbits</div>
        </Card>
      </div>

      {/* Most Read Article */}
      {mostReadArticle && (
        <Card className="p-6 rounded-3xl">
          <h3 className="text-xl mb-4">🏆 Artikel Terpopuler</h3>
          <div 
            className="p-6 rounded-2xl mb-4"
            style={{ background: mostReadArticle.gradient }}
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
                  <span>{mostReadArticle.date}</span>
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
          {userArticles.length === 0 ? (
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
                    <span>{article.date}</span>
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
                    <div className="flex items-center gap-1 text-orange-600">
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
      <Card className="p-6 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 border-0">
        <h3 className="text-xl mb-4">💡 Tips Meningkatkan Engagement</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">1</span>
            </div>
            <div>
              <h4 className="mb-1">Tulis Judul yang Menarik</h4>
              <p className="text-sm text-gray-600">Judul yang catchy akan meningkatkan jumlah pembaca</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">2</span>
            </div>
            <div>
              <h4 className="mb-1">Pilih Topik yang Relevan</h4>
              <p className="text-sm text-gray-600">Tulis tentang hal-hal yang sedang trending atau dekat dengan pembaca</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
