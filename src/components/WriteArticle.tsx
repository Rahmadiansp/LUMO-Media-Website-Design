import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { Star, PenLine } from "lucide-react";

interface WriteArticleProps {
  onSubmit: (glowbits: number) => void;
  onNavigateToFeeds?: () => void;
}

export function WriteArticle({ onSubmit, onNavigateToFeeds }: WriteArticleProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title && category && content) {
      const glowbitsReward = 25;
      onSubmit(glowbitsReward);
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setTitle("");
        setCategory("");
        setContent("");
        // Navigate to feeds after article is published
        if (onNavigateToFeeds) {
          onNavigateToFeeds();
        }
      }, 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2 flex items-center gap-3">
          <PenLine className="w-8 h-8 text-purple-600" />
          Tulis Berita
        </h2>
        <p className="text-gray-600">
          Bagikan ceritamu dan dapatkan Glowbits!
        </p>
      </div>

      {showSuccess && (
        <Card className="mb-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-green-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 fill-white text-white" />
            </div>
            <div>
              <p className="text-green-900">Artikel berhasil dikirim!</p>
              <p className="text-sm text-green-700">Kamu mendapatkan +25 Glowbits</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-8 rounded-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Judul Berita</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul berita yang menarik..."
              className="rounded-xl border-2 border-gray-200 focus:border-purple-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Kategori</label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="rounded-xl border-2 border-gray-200">
                <SelectValue placeholder="Pilih kategori berita" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lingkungan">🌱 Lingkungan</SelectItem>
                <SelectItem value="pendidikan">📚 Pendidikan</SelectItem>
                <SelectItem value="teknologi">💻 Teknologi</SelectItem>
                <SelectItem value="olahraga">⚽ Olahraga</SelectItem>
                <SelectItem value="seni">🎨 Seni & Budaya</SelectItem>
                <SelectItem value="sosial">🤝 Sosial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2">Isi Berita</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ceritakan beritamu di sini... Apa yang terjadi? Siapa yang terlibat? Mengapa ini penting?"
              className="min-h-[300px] rounded-xl border-2 border-gray-200 focus:border-purple-400"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Minimal 100 karakter ({content.length}/100)
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl">
            <h4 className="mb-2">💡 Tips Menulis Berita yang Baik:</h4>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Gunakan judul yang menarik dan informatif</li>
              <li>Tuliskan fakta, bukan opini</li>
              <li>Sertakan 5W+1H (What, Who, When, Where, Why, How)</li>
              <li>Gunakan bahasa yang mudah dipahami</li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>Dapatkan +25 Glowbits!</span>
            </div>
            <Button
              type="submit"
              disabled={!title || !category || content.length < 100}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 disabled:opacity-50"
            >
              Kirim Berita
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}