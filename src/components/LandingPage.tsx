import { Sparkles, Pen, BookOpen, Trophy, Users, Zap, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
}

export function LandingPage({ onNavigateToLogin, onNavigateToRegister }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-[#0360fd]/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="text-3xl bg-gradient-to-r from-[#0360fd] via-[#fe9ecd] to-[#ff7303] bg-clip-text text-transparent">
                LUMO
              </div>
              <div className="w-2 h-2 rounded-full bg-[#ff7303]"></div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={onNavigateToLogin}
              className="rounded-full px-6 hover:bg-[#0360fd]/10"
            >
              Masuk
            </Button>
            <Button 
              onClick={onNavigateToRegister}
              className="rounded-full px-6 bg-gradient-to-r from-[#0360fd] to-[#fe9ecd] hover:from-[#0250d0] hover:to-[#fd8ebd]"
            >
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-700">Platform Jurnalisme untuk Remaja Indonesia</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Kata Kita, Suara Dunia
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kata Kita, Suara Dunia! Tulis berita, bagikan cerita, dan raih Glowbits untuk kustomisasi avatarmu. 
            Suaramu penting untuk Indonesia!
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <Button 
              size="lg"
              onClick={onNavigateToRegister}
              className="rounded-full px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Mulai Petualangan
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={onNavigateToLogin}
              className="rounded-full px-8 py-6 border-2 border-purple-300"
            >
              Sudah Punya Akun
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">12K+</div>
              <div className="text-sm text-gray-600">Jurnalis Muda</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">25K+</div>
              <div className="text-sm text-gray-600">Artikel Diterbitkan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">500K+</div>
              <div className="text-sm text-gray-600">Pembaca Aktif</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl text-center mb-12">Kenapa Harus LUMO?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 rounded-3xl bg-gradient-to-br from-purple-100 to-purple-50 border-0">
            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Pen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl mb-3">Tulis Beritamu</h3>
            <p className="text-gray-600">
              Bagikan cerita dan pengalamanmu. Setiap suara penting dan berharga di LUMO!
            </p>
          </Card>

          <Card className="p-6 rounded-3xl bg-gradient-to-br from-pink-100 to-pink-50 border-0">
            <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl mb-3">Kumpulkan Glowbits</h3>
            <p className="text-gray-600">
              Dapatkan Glowbits dari membaca dan menulis. Gunakan untuk beli aksesori avatar keren!
            </p>
          </Card>

          <Card className="p-6 rounded-3xl bg-gradient-to-br from-orange-100 to-orange-50 border-0">
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl mb-3">Baca Berita Seru</h3>
            <p className="text-gray-600">
              Baca berita dari teman sebayamu tentang hal-hal menarik yang terjadi di sekitarmu.
            </p>
          </Card>

          <Card className="p-6 rounded-3xl bg-gradient-to-br from-blue-100 to-blue-50 border-0">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl mb-3">Kompetisi & Quest</h3>
            <p className="text-gray-600">
              Ikuti quest harian, quiz literasi media, dan bersaing di leaderboard!
            </p>
          </Card>

          <Card className="p-6 rounded-3xl bg-gradient-to-br from-green-100 to-green-50 border-0">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl mb-3">Komunitas Aktif</h3>
            <p className="text-gray-600">
              Terhubung dengan ribuan remaja Indonesia yang peduli dengan jurnalisme!
            </p>
          </Card>

          <Card className="p-6 rounded-3xl bg-gradient-to-br from-yellow-100 to-yellow-50 border-0">
            <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl mb-3">Konten Interaktif</h3>
            <p className="text-gray-600">
              Polling, quiz, fact-checking, dan mini games edukatif yang seru dan menantang!
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl text-center mb-12">Cara Kerjanya</h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">1</span>
            </div>
            <h3 className="text-xl mb-3">Daftar Gratis</h3>
            <p className="text-gray-600">
              Buat akun LUMO-mu dan mulai petualangan jurnalistikmu sekarang!
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">2</span>
            </div>
            <h3 className="text-xl mb-3">Baca & Tulis</h3>
            <p className="text-gray-600">
              Baca berita seru dan tulis artikel tentang hal yang kamu pedulikan.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">3</span>
            </div>
            <h3 className="text-xl mb-3">Raih Glowbits</h3>
            <p className="text-gray-600">
              Kumpulkan Glowbits dan kustomisasi avatar dengan aksesori keren!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-12 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 border-0 max-w-4xl mx-auto">
          <div className="text-center text-white">
            <Star className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl mb-4">Siap Jadi Jurnalis LUMO?</h2>
            <p className="text-xl mb-8 opacity-90">
              Bergabung dengan ribuan remaja Indonesia dan mulai berbagi ceritamu hari ini!
            </p>
            <Button 
              size="lg"
              onClick={onNavigateToRegister}
              className="rounded-full px-8 py-6 bg-white text-purple-600 hover:bg-gray-100"
            >
              Daftar Sekarang - GRATIS!
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-2xl">LUMO</span>
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            </div>
            <p className="text-sm text-gray-600">
              © 2025 LUMO. Platform Jurnalisme untuk Remaja Indonesia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}