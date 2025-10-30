import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 mb-8" 
         style={{
           background: 'linear-gradient(135deg, #A78BFA 0%, #7DD3FC 50%, #FCA5A5 100%)'
         }}>
      <div className="relative z-10 max-w-2xl">
        <div className="inline-block mb-6 px-6 py-3 bg-white rounded-full shadow-lg">
          <p className="text-gray-800">
            <span className="mr-2">💬</span>
            Kirimanmu, Dunalimu! Jadilah Jurnalis LUMO
          </p>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-white text-4xl md:text-5xl">
            Tulis Berita Pertamamu!
          </h1>
          <p className="text-white/90 text-lg">
            Baca Berita, Dapat Glowbits!
          </p>
          <Button 
            className="bg-white text-purple-600 hover:bg-purple-50 rounded-full px-6 py-6 mt-4"
          >
            Sokewiit
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-8 right-8 w-8 h-8 bg-yellow-300 rounded-full opacity-60"></div>
      <div className="absolute bottom-12 right-24 w-6 h-6 bg-pink-300 rounded-full opacity-60"></div>
      <div className="absolute top-1/2 right-12 w-4 h-4 bg-orange-300 rounded-full opacity-60"></div>
      <div className="absolute bottom-8 left-1/3 w-5 h-5 bg-purple-300 rounded-full opacity-60"></div>
      
      {/* Character illustration placeholder - would be replaced with actual illustrations */}
      <div className="absolute bottom-0 right-0 hidden lg:flex items-end gap-4 opacity-20">
        <div className="w-24 h-32 bg-white/30 rounded-t-full"></div>
        <div className="w-24 h-36 bg-white/30 rounded-t-full"></div>
        <div className="w-24 h-32 bg-white/30 rounded-t-full"></div>
      </div>
    </div>
  );
}
