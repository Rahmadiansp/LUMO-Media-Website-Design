import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Target, FileText, BookOpen, Award, Sparkles, Edit, Trash2, Check, X } from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ProfileProps {
  userName: string;
  userEmail?: string;
  glowbits: number;
  onOpenAvatar: () => void;
  onEditArticle?: (article: any) => void;
  onNicknameChange?: (newNickname: string) => void;
}

export function Profile({ userName, userEmail, glowbits, onOpenAvatar, onEditArticle, onNicknameChange }: ProfileProps) {
  const [publishedArticles, setPublishedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingArticleId, setDeletingArticleId] = useState<string | null>(null);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState(userName);
  const [savingNickname, setSavingNickname] = useState(false);

  useEffect(() => {
    if (userEmail) {
      fetchUserArticles();
    }
  }, [userEmail]);

  const fetchUserArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/${encodeURIComponent(userEmail)}/articles`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPublishedArticles(data.articles);
      }
    } catch (err) {
      console.error('Error fetching user articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (!window.confirm('Apakah kamu yakin ingin menghapus artikel ini?')) {
      return;
    }

    try {
      setDeletingArticleId(articleId);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/articles/${articleId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authorEmail: userEmail }),
        }
      );

      if (response.ok) {
        // Refresh article list
        fetchUserArticles();
      } else {
        const errorData = await response.json();
        alert('Gagal menghapus artikel: ' + (errorData.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error deleting article:', err);
      alert('Gagal menghapus artikel');
    } finally {
      setDeletingArticleId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Mock data for demo (if no email provided)
  const completedQuestsCount = 5;

  const totalReads = publishedArticles.reduce((sum, article) => sum + (article.reads || 0), 0);

  const handleSaveNickname = async () => {
    if (!onNicknameChange) return;
    setSavingNickname(true);
    try {
      onNicknameChange(newNickname);
      setIsEditingNickname(false);
    } catch (err) {
      console.error('Error saving nickname:', err);
      alert('Gagal menyimpan nickname');
    } finally {
      setSavingNickname(false);
    }
  };

  const handleCancelNicknameEdit = () => {
    setIsEditingNickname(false);
    setNewNickname(userName);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
          Profil Saya
        </h1>
        <p className="text-lg text-gray-600">
          Lihat statistik dan pencapaianmu di LUMO
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info & Stats */}
        <div className="space-y-6">
          {/* Username Card */}
          <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#0360fd]/10 to-[#fe9ecd]/10 border-2 border-[#0360fd]/30">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#0360fd] to-[#fe9ecd] rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👤
              </div>
              <h2 className="text-2xl mb-1">{userName}</h2>
              <p className="text-sm text-gray-600">Jurnalis Muda LUMO</p>
            </div>
          </Card>

          {/* Glowbits Card */}
          <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#ffcf03]/10 to-[#ff7303]/10 border-2 border-[#ff7303]/30">
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-[#ff7303] mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Total Glowbits</p>
              <p className="text-4xl bg-gradient-to-r from-[#ff7303] to-[#ffcf03] bg-clip-text text-transparent">
                {glowbits}
              </p>
              <Button
                onClick={onOpenAvatar}
                className="mt-4 w-full rounded-full bg-gradient-to-r from-[#ff7303] to-[#ffcf03] hover:from-[#e66303] hover:to-[#efbf03]"
              >
                Belanja Aksesori
              </Button>
            </div>
          </Card>

          {/* Stats Cards */}
          <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#0360fd]/10 to-[#0360fd]/5 border-2 border-[#0360fd]/30">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-[#0360fd]" />
              <h3 className="text-lg">Quest Selesai</h3>
            </div>
            <p className="text-3xl">{completedQuestsCount}</p>
            <p className="text-sm text-gray-600 mt-1">Misi telah diselesaikan</p>
          </Card>

          <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#fe9ecd]/10 to-[#fe9ecd]/5 border-2 border-[#fe9ecd]/30">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-[#fe9ecd]" />
              <h3 className="text-lg">Total Artikel</h3>
            </div>
            <p className="text-3xl">{loading ? '-' : publishedArticles.length}</p>
            <p className="text-sm text-gray-600 mt-1">Berita yang telah ditulis</p>
          </Card>

          <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#02a356]/10 to-[#02a356]/5 border-2 border-[#02a356]/30">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-[#02a356]" />
              <h3 className="text-lg">Total Dibaca</h3>
            </div>
            <p className="text-3xl">{loading ? '-' : totalReads}</p>
            <p className="text-sm text-gray-600 mt-1">Kali artikelmu dibaca orang</p>
          </Card>
        </div>

        {/* Right Column - Achievements & Articles */}
        <div className="lg:col-span-2 space-y-6">
          {/* Achievement Badges */}
          <Card className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl">Pencapaian</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-2xl bg-white/80">
                <div className="text-4xl mb-2">✍️</div>
                <p className="text-sm">Penulis Pemula</p>
                <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                  Aktif
                </Badge>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/80">
                <div className="text-4xl mb-2">🔥</div>
                <p className="text-sm">Penulis Aktif</p>
                <Badge className={`mt-2 rounded-full ${publishedArticles.length >= 3 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {publishedArticles.length >= 3 ? 'Aktif' : 'Terkunci'}
                </Badge>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/80">
                <div className="text-4xl mb-2">⭐</div>
                <p className="text-sm">Populer</p>
                <Badge className={`mt-2 rounded-full ${totalReads >= 100 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {totalReads >= 100 ? 'Aktif' : 'Terkunci'}
                </Badge>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/80">
                <div className="text-4xl mb-2">🎯</div>
                <p className="text-sm">Quest Master</p>
                <Badge className="mt-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                  Aktif
                </Badge>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/80">
                <div className="text-4xl mb-2">💰</div>
                <p className="text-sm">Kolektor Glowbits</p>
                <Badge className={`mt-2 rounded-full ${glowbits >= 500 ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {glowbits >= 500 ? 'Aktif' : 'Terkunci'}
                </Badge>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/80 opacity-50">
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-sm">Champion</p>
                <Badge className="mt-2 bg-gray-300 text-gray-600 rounded-full">
                  Terkunci
                </Badge>
              </div>
            </div>
          </Card>

          {/* Published Articles */}
          <Card className="p-8 rounded-3xl border-2 border-purple-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl">Karya Beritaku</h2>
              </div>
              <Badge className="bg-purple-100 text-purple-700 rounded-full px-4 py-1">
                {loading ? '-' : publishedArticles.length} Artikel
              </Badge>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  <p>Memuat artikel...</p>
                </div>
              ) : publishedArticles.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>Belum ada artikel yang diterbitkan</p>
                  <p className="text-sm mt-2">Mulai tulis artikel pertamamu!</p>
                </div>
              ) : (
                publishedArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all border-2 border-purple-100 hover:border-purple-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg mb-2">{article.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <Badge variant="outline" className="rounded-full border-purple-300">
                            {article.category}
                          </Badge>
                          <span className="flex items-center gap-1">
                            📅 {formatDate(article.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            👁️ {article.reads || 0} dibaca
                          </span>
                          {onEditArticle && (
                            <Button
                              onClick={() => onEditArticle(article)}
                              className="ml-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="ml-2 px-2 py-1 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full"
                            disabled={deletingArticleId === article.id}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}