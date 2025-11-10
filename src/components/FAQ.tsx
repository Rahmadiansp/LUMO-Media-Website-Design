import { Card } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { HelpCircle, Star, Pencil, BookOpen, Award, Palette } from "lucide-react";

export function FAQ() {
  const faqCategories = [
    {
      category: "Tentang LUMO",
      icon: HelpCircle,
      color: "from-purple-500 to-pink-500",
      questions: [
        {
          q: "Apa itu LUMO?",
          a: "LUMO adalah platform media berita digital yang dirancang khusus untuk remaja Indonesia usia 12-17 tahun. Di LUMO, kamu bisa membaca berita yang ditulis oleh sesama remaja dan juga menulis berita sendiri tentang hal-hal yang kamu anggap penting!"
        },
        {
          q: "Siapa yang bisa bergabung dengan LUMO?",
          a: "LUMO terbuka untuk semua remaja Indonesia berusia 12-17 tahun yang tertarik dengan jurnalisme, suka membaca, dan ingin berbagi cerita mereka dengan dunia."
        },
        {
          q: "Apakah LUMO gratis?",
          a: "Ya! LUMO 100% gratis untuk digunakan. Kamu tidak perlu membayar apapun untuk membaca berita, menulis artikel, atau mengumpulkan Glowbits."
        }
      ]
    },
    {
      category: "Sistem Glowbits",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      questions: [
        {
          q: "Apa itu Glowbits?",
          a: "Glowbits adalah mata uang virtual di LUMO yang bisa kamu kumpulkan dengan membaca berita, menulis artikel, menyelesaikan quest, dan mengikuti quiz. Glowbits dapat digunakan untuk membeli aksesori avatar keren!"
        },
        {
          q: "Bagaimana cara mendapatkan Glowbits?",
          a: "Ada banyak cara: (1) Baca artikel hingga selesai (+10 Glowbits), (2) Tulis dan publikasikan artikel (+50 Glowbits), (3) Selesaikan quest harian (+20-50 Glowbits), (4) Ikuti quiz literasi media (+15-25 Glowbits tergantung skor)."
        },
        {
          q: "Apakah Glowbits bisa ditukar dengan uang?",
          a: "Tidak, Glowbits adalah mata uang virtual yang hanya bisa digunakan di dalam platform LUMO untuk membeli aksesori avatar dan item digital lainnya."
        },
        {
          q: "Berapa maksimal Glowbits yang bisa dikumpulkan?",
          a: "Tidak ada batas maksimal! Kamu bisa mengumpulkan sebanyak mungkin Glowbits dengan aktif membaca, menulis, dan berpartisipasi di LUMO."
        }
      ]
    },
    {
      category: "Menulis Artikel",
      icon: Pencil,
      color: "from-blue-500 to-purple-500",
      questions: [
        {
          q: "Bagaimana cara menulis artikel di LUMO?",
          a: "Klik tombol 'Tulis Berita' di menu atau floating button di kanan bawah. Pilih kategori, tulis judul dan isi artikelmu, lalu klik 'Kirim Artikel'. Setelah disubmit, artikelmu akan langsung muncul di feed!"
        },
        {
          q: "Apa saja yang bisa saya tulis?",
          a: "Kamu bisa menulis tentang apapun yang menarik dan relevan untuk remaja: berita sekolah, event lokal, hobi, teknologi, lingkungan, olahraga, seni, dan masih banyak lagi. Pastikan tulisanmu faktual, jelas, dan menghormati orang lain."
        },
        {
          q: "Apakah ada moderasi untuk artikel yang saya tulis?",
          a: "Saat ini artikel langsung dipublikasikan setelah kamu submit. Namun, kami memiliki sistem pelaporan jika ada konten yang tidak pantas. Harap selalu menulis dengan bertanggung jawab!"
        },
        {
          q: "Berapa panjang artikel yang ideal?",
          a: "Artikel ideal memiliki panjang 300-800 kata. Cukup untuk menjelaskan topikmu dengan detail, tetapi tidak terlalu panjang sehingga pembaca tetap tertarik hingga akhir."
        },
        {
          q: "Bisakah saya mengedit artikel setelah dipublikasikan?",
          a: "Saat ini fitur edit belum tersedia, jadi pastikan kamu sudah mengecek artikelmu dengan baik sebelum submit. Tapi jangan khawatir, fitur ini akan segera hadir!"
        }
      ]
    },
    {
      category: "Membaca & Feeds",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
      questions: [
        {
          q: "Apa bedanya Redaksi LUMO dan artikel dari pembaca?",
          a: "Redaksi LUMO adalah artikel yang ditulis oleh tim editorial LUMO tentang topik penting untuk remaja. Artikel dari pembaca adalah artikel yang ditulis oleh pengguna LUMO seperti kamu! Keduanya sama-sama menarik dan bernilai."
        },
        {
          q: "Bagaimana cara filter artikel berdasarkan kategori?",
          a: "Di halaman Feeds, kamu bisa menggunakan tab filter untuk melihat 'Semua Berita', 'Redaksi LUMO', atau 'Dari Pembaca'. Kamu juga bisa melihat artikel per kategori seperti Teknologi, Pendidikan, Lingkungan, dll."
        },
        {
          q: "Kenapa saya harus membaca artikel hingga selesai?",
          a: "Membaca hingga selesai tidak hanya memberimu Glowbits, tapi juga membantu kamu memahami topik dengan lebih baik dan mendukung penulis artikel tersebut. Plus, kamu akan lebih terinformasi!"
        }
      ]
    },
    {
      category: "Quest & Gamifikasi",
      icon: Award,
      color: "from-pink-500 to-rose-500",
      questions: [
        {
          q: "Apa itu Quest?",
          a: "Quest adalah tantangan harian yang bisa kamu selesaikan untuk mendapatkan Glowbits bonus. Contohnya: baca 3 artikel dalam sehari, tulis artikel pertamamu, atau kustomisasi avatarmu."
        },
        {
          q: "Apakah Quest berubah setiap hari?",
          a: "Quest harian akan refresh setiap 24 jam. Namun, ada juga quest spesial yang berlaku lebih lama atau quest pencapaian yang hanya perlu diselesaikan sekali."
        },
        {
          q: "Bagaimana cara melihat progress Quest saya?",
          a: "Progress questmu bisa dilihat di halaman Beranda bagian Quest atau di halaman Profil. Di sana kamu bisa melihat quest mana yang sudah selesai dan mana yang masih dalam progress."
        },
        {
          q: "Apa itu Leaderboard?",
          a: "Leaderboard menampilkan pengguna dengan Glowbits terbanyak. Ini adalah cara seru untuk berkompetisi dengan teman-temanmu dan melihat siapa yang paling aktif di LUMO!"
        }
      ]
    },
    {
      category: "Avatar & Kustomisasi",
      icon: Palette,
      color: "from-indigo-500 to-blue-500",
      questions: [
        {
          q: "Bagaimana cara kustomisasi avatar saya?",
          a: "Klik menu 'Profil Saya' dari burger menu, lalu scroll ke bagian Kustomisasi Avatar. Di sana kamu bisa memilih warna kulit, rambut, mata, pakaian, dan aksesori. Beberapa item gratis, yang lain bisa dibeli dengan Glowbits."
        },
        {
          q: "Item apa saja yang gratis?",
          a: "Semua warna kulit, mata dasar, mulut dasar, rambut pendek, T-shirt, dan background default sudah gratis dan bisa langsung kamu gunakan!"
        },
        {
          q: "Berapa harga aksesori premium?",
          a: "Aksesori premium bervariasi dari 25 hingga 80 Glowbits tergantung item. Kacamata misalnya 40 Glowbits, sedangkan Crown adalah 80 Glowbits karena termasuk item eksklusif."
        },
        {
          q: "Bisakah saya mengganti avatar kapan saja?",
          a: "Tentu! Kamu bisa mengganti warna kulit, rambut, pakaian, atau aksesori kapanpun kamu mau. Item yang sudah kamu beli akan tersimpan dan bisa kamu gunakan lagi di kemudian hari."
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
          <HelpCircle className="w-6 h-6 text-purple-600" />
          <h1 className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Punya pertanyaan tentang LUMO? Temukan jawabannya di sini! Jika pertanyaanmu belum terjawab, 
          hubungi kami melalui email di <span className="text-purple-600">hello@lumo.id</span>
        </p>
      </div>

      <div className="space-y-6">
        {faqCategories.map((category, idx) => {
          const Icon = category.icon;
          
          return (
            <Card key={idx} className="p-6 rounded-3xl border-2 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl">{category.category}</h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIdx) => (
                  <AccordionItem key={faqIdx} value={`item-${idx}-${faqIdx}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left hover:text-purple-600 py-4">
                      <span className="pr-4">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          );
        })}
      </div>

      {/* Contact Section */}
      <Card className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-2 border-purple-200">
        <div className="text-center">
          <h3 className="text-2xl mb-3">Masih Punya Pertanyaan?</h3>
          <p className="text-gray-600 mb-4">
            Tim LUMO siap membantu! Hubungi kami melalui:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
              <span className="text-purple-600">📧</span>
              <span>hello@lumo.id</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm">
              <span className="text-pink-600">💬</span>
              <span>@lumo.indonesia</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">
            "Kata Kita, Suara Dunia!"
          </p>
        </div>
      </Card>
    </div>
  );
}
