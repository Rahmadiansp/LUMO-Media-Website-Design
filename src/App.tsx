import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Feeds } from "./components/Feeds";
import { Insights } from "./components/Insights";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { HeadlineNews } from "./components/HeadlineNews";
import { NewsCard } from "./components/NewsCard";
import { AvatarCustomization } from "./components/AvatarCustomization";
import { ArticleReader } from "./components/ArticleReader";
import { WriteArticle } from "./components/WriteArticle";
import { Quests } from "./components/Quests";
import { Quiz } from "./components/Quiz";
import { Leaderboard } from "./components/Leaderboard";
import { Profile } from "./components/Profile";
import { InteractiveNews } from "./components/InteractiveNews";
import { Card } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

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

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<"landing" | "login" | "register">("landing");
  const [userName, setUserName] = useState("Kamu");
  const [userEmail, setUserEmail] = useState("");
  
  const [currentSection, setCurrentSection] = useState("feeds");
  const [glowbits, setGlowbits] = useState(150);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [readArticlesCount, setReadArticlesCount] = useState(0);
  const [hasWrittenArticle, setHasWrittenArticle] = useState(false);
  const [hasCustomizedAvatar, setHasCustomizedAvatar] = useState(false);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [userPublishedArticles, setUserPublishedArticles] = useState<Article[]>([
    {
      id: "demo-1",
      title: "Pengalaman Pertama Mengikuti Kompetisi Robotika",
      author: "Kamu",
      category: "Teknologi",
      date: "19 Okt 2025",
      reads: 142,
      gradient: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
      glowbitsReward: 10,
      content: "Demo article",
      type: "user-generated"
    },
    {
      id: "demo-2",
      title: "Tips Belajar Efektif untuk Persiapan Ujian",
      author: "Kamu",
      category: "Pendidikan",
      date: "15 Okt 2025",
      reads: 98,
      gradient: "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)",
      glowbitsReward: 10,
      content: "Demo article",
      type: "user-generated"
    }
  ]);

  const articles: Article[] = [
    {
      id: "1",
      title: "Remaja Ubah Sampah Plastik Jadi Karya Seni!",
      author: "Sena",
      category: "Lingkungan",
      date: "20 Okt 2025",
      reads: 234,
      gradient: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
      glowbitsReward: 10,
      type: "user-generated",
      content: `Sampah plastik menjadi salah satu masalah lingkungan terbesar di Indonesia. Namun, sekelompok remaja di Jakarta Selatan menemukan cara kreatif untuk mengatasi masalah ini.

Mereka mengubah botol plastik bekas menjadi karya seni yang indah. "Kami ingin menunjukkan bahwa sampah bisa menjadi sesuatu yang berharga," kata Rani, salah satu anggota kelompok.

Proyek ini dimulai tiga bulan yang lalu dengan hanya lima orang. Sekarang, mereka sudah memiliki 20 anggota aktif. Setiap minggu, mereka mengumpulkan botol plastik dari lingkungan sekitar dan mengubahnya menjadi lampu hias, pot tanaman, dan dekorasi dinding.

"Yang paling membanggakan adalah ketika orang-orang mulai peduli dengan lingkungan setelah melihat karya kami," tambah Rani. Karya-karya mereka kini dipamerkan di beberapa kafe dan galeri seni lokal.`
    },
    {
      id: "2",
      title: "Game Edukatif Kembangkan Kreativitas Remaja",
      author: "Redaksi LUMO",
      category: "Teknologi",
      date: "19 Okt 2025",
      reads: 189,
      gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
      glowbitsReward: 10,
      type: "editorial",
      content: `Sebuah game edukatif baru telah diluncurkan khusus untuk remaja Indonesia. Game ini dirancang untuk meningkatkan kreativitas dan kemampuan memecahkan masalah.

"MineCraft Education Edition" memungkinkan pemain untuk membangun dunia virtual mereka sendiri sambil belajar tentang arsitektur, matematika, dan kerja sama tim. Game ini sudah digunakan di beberapa sekolah di Jakarta dan Bandung.

Para guru melaporkan peningkatan signifikan dalam keterlibatan siswa. "Mereka belajar tanpa merasa sedang belajar," kata Pak Budi, guru di salah satu sekolah yang menggunakan game ini.

Game ini gratis untuk sekolah-sekolah di Indonesia dan dapat diunduh melalui platform resmi Kementerian Pendidikan.`
    },
    {
      id: "3",
      title: "Tim Basket SMA Raih Juara Pertama!",
      author: "Dion",
      category: "Olahraga",
      date: "18 Okt 2025",
      reads: 312,
      gradient: "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)",
      glowbitsReward: 10,
      type: "user-generated",
      content: `Tim basket SMA Negeri 5 Surabaya berhasil meraih juara pertama dalam turnamen basket antar sekolah se-Jawa Timur. Kemenangan ini adalah yang pertama untuk sekolah mereka dalam 10 tahun terakhir.

"Kami berlatih sangat keras selama enam bulan," kata Andi, kapten tim. "Setiap hari setelah sekolah, kami berlatih minimal dua jam."

Pelatih tim, Pak Hendra, mengatakan kunci kesuksesan tim adalah kerja sama dan disiplin. "Mereka tidak hanya hebat secara individu, tapi juga sebagai tim," jelasnya.

Final pertandingan berlangsung sangat sengit dengan skor 78-75. Tim berhasil mencetak poin kemenangan di detik-detik terakhir pertandingan.`
    },
    {
      id: "4",
      title: "Perpustakaan Digital Gratis untuk Pelajar",
      author: "Redaksi LUMO",
      category: "Pendidikan",
      date: "17 Okt 2025",
      reads: 267,
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
      glowbitsReward: 10,
      type: "editorial",
      content: `Pemerintah meluncurkan perpustakaan digital gratis yang dapat diakses oleh seluruh pelajar di Indonesia. Platform "BacaYuk" menyediakan lebih dari 10.000 buku pelajaran, novel, dan komik edukasi.

Aplikasi ini dapat diunduh di smartphone dan tidak memerlukan kuota internet untuk membaca buku yang sudah diunduh. "Kami ingin memastikan semua anak Indonesia memiliki akses ke bacaan berkualitas," kata Ibu Dewi, Direktur Program.

Fitur menarik lainnya adalah sistem poin membaca. Setiap halaman yang dibaca akan menghasilkan poin yang bisa ditukar dengan merchandise pendidikan atau donasi buku untuk sekolah-sekolah di daerah terpencil.

Sejak diluncurkan dua minggu lalu, aplikasi ini sudah diunduh lebih dari 500.000 kali.`
    },
    {
      id: "5",
      title: "Festival Musik Remaja Kembali Digelar",
      author: "Redaksi LUMO",
      category: "Seni & Budaya",
      date: "16 Okt 2025",
      reads: 445,
      gradient: "linear-gradient(135deg, #F59E0B 0%, #10B981 100%)",
      glowbitsReward: 10,
      type: "editorial",
      content: `Festival musik tahunan "Youth Voice" akan kembali digelar bulan depan di Jakarta. Festival ini memberikan kesempatan bagi musisi muda untuk tampil di panggung besar.

Tahun ini, panitia menerima lebih dari 200 pendaftaran dari berbagai genre musik mulai dari pop, rock, hingga musik tradisional modern. "Antusiasme anak muda terhadap musik sangat luar biasa," kata Rina, ketua panitia.

Festival ini tidak hanya tentang pertunjukan musik, tetapi juga workshop tentang produksi musik, penulisan lagu, dan manajemen karir di industri musik.

Tiket untuk festival ini gratis tetapi terbatas. Pendaftaran dapat dilakukan melalui website resmi festival mulai minggu depan.`
    },
    {
      id: "6",
      title: "Siswa Ciptakan Robot Pembersih Pantai",
      author: "Farah",
      category: "Teknologi",
      date: "15 Okt 2025",
      reads: 198,
      gradient: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
      glowbitsReward: 10,
      type: "user-generated",
      content: `Tiga siswa SMA di Bali berhasil menciptakan robot yang dapat membersihkan sampah di pantai secara otomatis. Robot ini menggunakan sensor untuk mendeteksi dan mengumpulkan sampah plastik.

"Kami melihat banyak sampah di pantai dekat rumah kami, jadi kami berpikir untuk membuat solusi," kata Ketut, salah satu penemu robot tersebut.

Robot ini dapat beroperasi selama 4 jam dengan sekali pengisian daya dan mampu mengumpulkan hingga 50 kilogram sampah. Mereka berencana mengembangkan versi yang lebih besar untuk membersihkan area yang lebih luas.

Proyek ini mendapat dukungan dari pemerintah daerah dan beberapa perusahaan teknologi. Tim berharap robot mereka dapat diproduksi massal untuk membantu menjaga kebersihan pantai-pantai di Indonesia.`
    },
    {
      id: "7",
      title: "Komunitas Baca di Taman Kota Ramai Dikunjungi",
      author: "Lina",
      category: "Sosial",
      date: "14 Okt 2025",
      reads: 156,
      gradient: "linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)",
      glowbitsReward: 10,
      type: "user-generated",
      content: `Komunitas baca "TamanBaca" yang didirikan oleh sekelompok remaja di Bandung kini menjadi tempat favorit anak-anak muda untuk berkumpul dan membaca.

Setiap akhir pekan, puluhan remaja datang ke Taman Lansia membawa buku favorit mereka. "Kami ingin menciptakan ruang di mana membaca itu asyik dan nggak boring," kata Lina, salah satu pendiri komunitas.

Selain membaca, mereka juga mengadakan diskusi buku, book swap, dan storytelling. Komunitas ini terbuka untuk siapa saja dan gratis.

"Yang bikin senang, makin banyak anak muda yang tertarik baca buku fisik lagi, bukan cuma scroll HP," tambah Lina dengan bangga.`
    },
    {
      id: "8",
      title: "Kenaikan Harga Seragam Sekolah Jadi Keluhan Orang Tua",
      author: "Redaksi LUMO",
      category: "Ekonomi",
      date: "13 Okt 2025",
      reads: 342,
      gradient: "linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)",
      glowbitsReward: 10,
      type: "editorial",
      content: `Menjelang tahun ajaran baru, harga seragam sekolah mengalami kenaikan hingga 30 persen. Hal ini menjadi beban tambahan bagi orang tua siswa di berbagai daerah.

Berdasarkan survei di beberapa toko seragam, harga satu set seragam SMP kini mencapai Rp 250.000, naik dari Rp 180.000 tahun lalu. Kenaikan ini disebabkan oleh naiknya harga bahan baku dan ongkos produksi.

Beberapa sekolah merespons dengan mengadakan program tukar seragam bekas yang masih layak pakai. "Kami ingin membantu orang tua yang kesulitan," kata Ibu Sari, kepala sekolah SMP 12 Jakarta.

Pemerintah daerah juga berjanji akan memberikan subsidi seragam untuk keluarga kurang mampu agar semua anak tetap bisa bersekolah dengan layak.`
    },
    {
      id: "9",
      title: "Pengalaman Pertama Ikut Lomba Debat Nasional",
      author: "Rafi",
      category: "Pendidikan",
      date: "12 Okt 2025",
      reads: 203,
      gradient: "linear-gradient(135deg, #3B82F6 0%, #10B981 100%)",
      glowbitsReward: 10,
      type: "user-generated",
      content: `Minggu lalu, aku berkesempatan mengikuti Lomba Debat Bahasa Inggris tingkat nasional di Jakarta. Ini adalah pengalaman pertamaku dan sangat menegangkan!

Kami bertiga mewakili sekolah berdebat melawan tim dari berbagai provinsi. Topiknya tentang penggunaan teknologi AI di sekolah. Aku yang jadi pembicara pertama, dan jujur, tanganku sampai gemetar saat mulai bicara.

Tapi setelah beberapa menit, aku mulai enjoy dan fokus pada argumen yang sudah kami persiapkan. Meski kami tidak menang, pengalaman ini sangat berharga. Aku jadi lebih percaya diri dan belajar banyak tentang public speaking.

Buat teman-teman yang mau coba lomba debat, GO FOR IT! Kamu akan belajar hal-hal baru yang nggak didapat di kelas biasa.`
    },
    {
      id: "10",
      title: "Warung Kopi Ramah Pelajar Tawarkan Diskon Khusus",
      author: "Redaksi LUMO",
      category: "Gaya Hidup",
      date: "11 Okt 2025",
      reads: 278,
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
      glowbitsReward: 10,
      type: "editorial",
      content: `Beberapa warung kopi di Jakarta dan Bandung kini menawarkan program khusus untuk pelajar dengan diskon hingga 50 persen. Program "Student Friendly Cafe" ini bertujuan mendukung produktivitas belajar siswa.

Dengan menunjukkan kartu pelajar, siswa bisa mendapat diskon untuk minuman dan cemilan. Beberapa kafe bahkan menyediakan ruang khusus untuk belajar kelompok dengan free WiFi dan stop kontak.

"Kami ingin café jadi tempat yang nyaman buat anak sekolah belajar tanpa khawatir budget," kata Mas Andi, pemilik salah satu café di Bandung.

Program ini mendapat respons positif dari pelajar dan orang tua. Diharapkan akan ada lebih banyak kafe yang bergabung dalam inisiatif ini.`
    }
  ];

  const editorialArticles = articles.filter(article => article.type === "editorial");
  const userGeneratedArticles = articles.filter(article => article.type === "user-generated");

  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article);
    setReadArticlesCount(prev => prev + 1);
  };

  const handleFinishReading = (earnedGlowbits: number) => {
    setGlowbits(prev => prev + earnedGlowbits);
    toast.success(`Selamat! Kamu mendapat +${earnedGlowbits} Glowbits`, {
      description: "Terus baca untuk mendapatkan lebih banyak!",
    });
  };

  const handlePurchaseAccessory = (cost: number) => {
    setGlowbits(prev => prev - cost);
    toast.success(`Aksesori berhasil dibeli!`, {
      description: `${cost} Glowbits terpakai`,
    });
    setHasCustomizedAvatar(true);
  };

  const handleSubmitArticle = (earnedGlowbits: number) => {
    // Create a new article object
    const newArticle: Article = {
      id: `user-${Date.now()}`,
      title: "Artikel Baru", // This would come from WriteArticle component
      author: "Kamu",
      category: "User Generated",
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      reads: Math.floor(Math.random() * 100) + 50,
      gradient: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
      glowbitsReward: 10,
      content: "",
      type: "user-generated"
    };
    
    setUserPublishedArticles(prev => [newArticle, ...prev]);
    setGlowbits(prev => prev + earnedGlowbits);
    toast.success(`Artikel berhasil dikirim! +${earnedGlowbits} Glowbits`, {
      description: "Terima kasih sudah berkontribusi!",
    });
    setHasWrittenArticle(true);
  };

  const handleCompleteQuest = (questId: string, reward: number) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests(prev => [...prev, questId]);
      setGlowbits(prev => prev + reward);
      toast.success(`Quest selesai! +${reward} Glowbits`, {
        description: "Lanjutkan petualanganmu!",
      });
    }
  };

  const handleCompleteQuiz = (score: number, reward: number) => {
    setGlowbits(prev => prev + reward);
    toast.success(`Quiz selesai! Skor: ${score}/5 - +${reward} Glowbits`, {
      description: "Pengetahuanmu meningkat!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="bottom-right" />
      
      {!isAuthenticated && currentPage === "landing" && (
        <LandingPage 
          onNavigateToLogin={() => setCurrentPage("login")}
          onNavigateToRegister={() => setCurrentPage("register")}
        />
      )}

      {!isAuthenticated && currentPage === "login" && (
        <Login 
          onLogin={(email, password) => {
            setUserEmail(email);
            setIsAuthenticated(true);
            setCurrentSection("feeds");
            toast.success("Selamat datang di LUMO!", {
              description: "Mulai petualangan jurnalistikmu!",
            });
          }}
          onNavigateToRegister={() => setCurrentPage("register")}
          onNavigateToLanding={() => setCurrentPage("landing")}
        />
      )}

      {!isAuthenticated && currentPage === "register" && (
        <Register 
          onRegister={(name, email, password) => {
            setUserName(name);
            setUserEmail(email);
            setIsAuthenticated(true);
            setCurrentSection("feeds");
            toast.success(`Selamat datang, ${name}!`, {
              description: "Akun LUMO-mu berhasil dibuat!",
            });
          }}
          onNavigateToLogin={() => setCurrentPage("login")}
          onNavigateToLanding={() => setCurrentPage("landing")}
        />
      )}

      {isAuthenticated && (
        <div className="min-h-screen bg-background">
          <Header 
            glowbits={glowbits} 
            onNavigate={setCurrentSection}
            currentSection={currentSection}
          />

          <main className="container mx-auto px-4 py-8">
            {currentSection === "home" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <HeroSection />

                  {/* Headline News - Top Stories */}
                  <HeadlineNews 
                    articles={articles}
                    onArticleClick={handleReadArticle}
                  />

                  {/* Quest dan Quiz Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Quests 
                      onCompleteQuest={handleCompleteQuest}
                      readArticlesCount={readArticlesCount}
                      hasWrittenArticle={hasWrittenArticle}
                      hasCustomizedAvatar={hasCustomizedAvatar}
                    />
                    <Quiz onCompleteQuiz={handleCompleteQuiz} />
                  </div>

                  {/* Berita Section dengan Tabs */}
                  <div className="mb-6">
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

                      <TabsContent value="all">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {articles.map((article) => (
                            <NewsCard
                              key={article.id}
                              title={article.title}
                              author={article.author}
                              reads={article.reads}
                              gradient={article.gradient}
                              category={article.category}
                              earnedGlowbits={article.glowbitsReward}
                              onClick={() => handleReadArticle(article)}
                            />
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="editorial">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {editorialArticles.map((article) => (
                            <NewsCard
                              key={article.id}
                              title={article.title}
                              author={article.author}
                              reads={article.reads}
                              gradient={article.gradient}
                              category={article.category}
                              earnedGlowbits={article.glowbitsReward}
                              onClick={() => handleReadArticle(article)}
                            />
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="user">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {userGeneratedArticles.map((article) => (
                            <NewsCard
                              key={article.id}
                              title={article.title}
                              author={article.author}
                              reads={article.reads}
                              gradient={article.gradient}
                              category={article.category}
                              earnedGlowbits={article.glowbitsReward}
                              onClick={() => handleReadArticle(article)}
                            />
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <div className="sticky top-24 space-y-6">
                    <Card className="p-6 rounded-3xl">
                      <AvatarCustomization 
                        glowbits={glowbits}
                        onPurchase={handlePurchaseAccessory}
                      />
                    </Card>

                    <Leaderboard 
                      currentUserGlowbits={glowbits}
                      currentUserName="Kamu"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentSection === "feeds" && (
              <Feeds 
                articles={[...userPublishedArticles, ...articles]}
                onArticleClick={handleReadArticle}
              />
            )}

            {currentSection === "write" && (
              <WriteArticle 
                onSubmit={handleSubmitArticle}
                onNavigateToFeeds={() => setCurrentSection("feeds")}
              />
            )}

            {currentSection === "insights" && (
              <Insights 
                publishedArticles={userPublishedArticles}
                totalGlowbitsEarned={glowbits}
              />
            )}

            {currentSection === "interactive" && (
              <InteractiveNews onEarnGlowbits={(amount) => setGlowbits(prev => prev + amount)} />
            )}

            {currentSection === "about" && (
              <div className="max-w-4xl mx-auto">
                <Card className="p-8 rounded-3xl">
                  <h2 className="text-3xl mb-6">Tentang LUMO</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl">
                      <h3 className="text-xl mb-3">🌟 Apa itu LUMO?</h3>
                      <p className="text-gray-700">
                        LUMO adalah platform media berita untuk remaja Indonesia usia 12-17 tahun. 
                        Di sini, kamu bisa membaca berita yang ditulis oleh teman sebayamu dan 
                        berbagi ceritamu sendiri!
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl">
                      <h3 className="text-xl mb-3">✍️ Jurnalisme Partisipatif</h3>
                      <p className="text-gray-700">
                        Setiap orang bisa menjadi jurnalis! Tulis berita tentang hal-hal menarik 
                        di sekitarmu dan bagikan dengan ribuan pembaca lainnya. Suaramu penting!
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl">
                      <h3 className="text-xl mb-3">⭐ Sistem Glowbits</h3>
                      <p className="text-gray-700">
                        Dapatkan Glowbits dengan membaca dan menulis berita. Gunakan Glowbits 
                        untuk membeli aksesori keren dan kustomisasi avatarmu!
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl">
                      <h3 className="text-xl mb-3">🎨 Kreativitas & Ekspresi</h3>
                      <p className="text-gray-700">
                        LUMO adalah tempatmu untuk berkreasi, belajar jurnalisme, dan 
                        terhubung dengan teman-teman seusiamu dari seluruh Indonesia!
                      </p>
                    </div>

                    <div className="text-center pt-6">
                      <p className="text-gray-600 italic">
                        "Kata Kita, Suara Dunia - Jadilah Jurnalis LUMO!"
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {currentSection === "profile" && (
              <Profile 
                glowbits={glowbits}
                onPurchase={handlePurchaseAccessory}
                completedQuestsCount={completedQuests.length}
                publishedArticles={userPublishedArticles}
                userName={userName}
                userEmail={userEmail}
              />
            )}
          </main>

          {selectedArticle && (
            <ArticleReader
              article={selectedArticle}
              onClose={() => setSelectedArticle(null)}
              onFinishReading={handleFinishReading}
            />
          )}
        </div>
      )}
    </div>
  );
}