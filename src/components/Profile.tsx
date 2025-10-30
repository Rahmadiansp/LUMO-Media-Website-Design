import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AvatarCustomization } from "./AvatarCustomization";
import { Badge } from "./ui/badge";
import { Pencil, Trophy, BookOpen, FileText, Target, Award } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  reads: number;
}

interface ProfileProps {
  glowbits: number;
  onPurchase: (cost: number) => void;
  completedQuestsCount: number;
  publishedArticles: Article[];
  userName: string;
  userEmail: string;
}

export function Profile({ glowbits, onPurchase, completedQuestsCount, publishedArticles, userName, userEmail }: ProfileProps) {
  const [username, setUsername] = useState(userName);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(userName);

  const handleSaveUsername = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim());
      setIsEditingUsername(false);
    }
  };

  const totalReads = publishedArticles.reduce((sum, article) => sum + article.reads, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Username Card */}
          <Card className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">👤 Username</h3>
              {!isEditingUsername && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsEditingUsername(true);
                    setTempUsername(username);
                  }}
                  className="rounded-full"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              )}
            </div>

            {isEditingUsername ? (
              <div className="space-y-3">
                <Input
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="rounded-xl"
                  maxLength={20}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveUsername}
                    className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-700"
                  >
                    Simpan
                  </Button>
                  <Button
                    onClick={() => setIsEditingUsername(false)}
                    variant="outline"
                    className="flex-1 rounded-xl"
                  >
                    Batal
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-2xl">{username}</p>
            )}
          </Card>

          {/* Stats Cards */}
          <Card className="p-6 rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg">Quest Selesai</h3>
            </div>
            <p className="text-3xl">{completedQuestsCount}</p>
            <p className="text-sm text-gray-600 mt-1">Misi telah diselesaikan</p>
          </Card>

          <Card className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg">Total Artikel</h3>
            </div>
            <p className="text-3xl">{publishedArticles.length}</p>
            <p className="text-sm text-gray-600 mt-1">Berita yang telah ditulis</p>
          </Card>

          <Card className="p-6 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <h3 className="text-lg">Total Dibaca</h3>
            </div>
            <p className="text-3xl">{totalReads}</p>
            <p className="text-sm text-gray-600 mt-1">Kali artikelmu dibaca orang</p>
          </Card>

          {/* Achievement Badges */}
          <Card className="p-6 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-pink-600" />
              <h3 className="text-lg">Pencapaian</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {publishedArticles.length >= 1 && (
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-3 py-1">
                  ✍️ Penulis Pemula
                </Badge>
              )}
              {publishedArticles.length >= 5 && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-3 py-1">
                  🔥 Penulis Aktif
                </Badge>
              )}
              {totalReads >= 100 && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full px-3 py-1">
                  ⭐ Populer
                </Badge>
              )}
              {completedQuestsCount >= 3 && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-3 py-1">
                  🎯 Quest Master
                </Badge>
              )}
              {glowbits >= 500 && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-3 py-1">
                  💰 Kolektor Glowbits
                </Badge>
              )}
            </div>
            {publishedArticles.length === 0 && completedQuestsCount === 0 && glowbits < 500 && totalReads < 100 && (
              <p className="text-sm text-gray-500 mt-2">Mulai menulis dan selesaikan quest untuk mendapatkan badge!</p>
            )}
          </Card>
        </div>

        {/* Right Column - Avatar & Articles */}
        <div className="lg:col-span-2 space-y-6">
          {/* Avatar Customization */}
          <Card className="p-8 rounded-3xl">
            <h2 className="text-2xl mb-6 flex items-center gap-3">
              🎨 Kustomisasi Avatar
            </h2>
            <AvatarCustomization glowbits={glowbits} onPurchase={onPurchase} />
          </Card>

          {/* Published Articles */}
          <Card className="p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl">Karya Beritaku</h2>
            </div>

            {publishedArticles.length > 0 ? (
              <div className="space-y-4">
                {publishedArticles.map((article) => (
                  <div
                    key={article.id}
                    className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg mb-2">{article.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <Badge variant="outline" className="rounded-full">
                            {article.category}
                          </Badge>
                          <span>📅 {article.date}</span>
                          <span>👁️ {article.reads} kali dibaca</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl mb-2">Belum Ada Artikel</h3>
                <p className="text-gray-600 mb-4">
                  Mulai tulis artikel pertamamu dan bagikan ceritamu dengan dunia!
                </p>
                <Button 
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Tulis Artikel Sekarang
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}