import { Button } from "./ui/button";
import { AvatarPreviewCompact } from "./AvatarPreviewCompact";
import type { AvatarConfig } from "../App";

interface HeroSectionProps {
  userName: string;
  glowbits: number;
  onOpenAvatar: () => void;
  avatarConfig: AvatarConfig;
}

export function HeroSection({ userName, glowbits, onOpenAvatar, avatarConfig }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 mb-8" 
         style={{
           background: 'linear-gradient(135deg, #A78BFA 0%, #7DD3FC 50%, #FCA5A5 100%)'
         }}>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="inline-block mb-6 px-6 py-3 bg-white rounded-full shadow-lg">
            <p className="text-gray-800">
              <span className="mr-2">💬</span>
              Kata Kita, Suara Dunia!
            </p>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-white text-4xl md:text-5xl">
              Selamat Datang, {userName}!
            </h1>
            <p className="text-white/90 text-lg">
              Baca Berita, Dapat Glowbits! Kamu punya {glowbits} Glowbits
            </p>
            <Button 
              onClick={onOpenAvatar}
              className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-6 py-5"
            >
              🎨 Kustomisasi Avatar
            </Button>
          </div>
        </div>

        {/* Avatar Display */}
        <div className="flex-shrink-0">
          <div 
            className="relative p-6 rounded-3xl bg-white/20 backdrop-blur-sm border-4 border-white/40 shadow-2xl hover:scale-105 transition-transform cursor-pointer"
            onClick={onOpenAvatar}
          >
            <AvatarPreviewCompact 
              config={avatarConfig}
              size="lg"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              ✨
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-8 right-8 w-8 h-8 bg-yellow-300 rounded-full opacity-60"></div>
      <div className="absolute bottom-12 right-24 w-6 h-6 bg-pink-300 rounded-full opacity-60"></div>
      <div className="absolute top-1/2 right-12 w-4 h-4 bg-orange-300 rounded-full opacity-60"></div>
      <div className="absolute bottom-8 left-1/3 w-5 h-5 bg-purple-300 rounded-full opacity-60"></div>
    </div>
  );
}