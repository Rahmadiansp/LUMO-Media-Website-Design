import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  glowbits: number;
  onNavigate: (section: string) => void;
  currentSection: string;
}

export function Header({ glowbits, onNavigate, currentSection }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'feeds', label: 'Feeds' },
    { id: 'interactive', label: 'Interaktif & Quiz' },
    { id: 'write', label: 'Tulis Berita' },
    { id: 'insights', label: 'Insights' },
    { id: 'profile', label: 'Profil Saya' },
    { id: 'about', label: 'Tentang Kami' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-purple-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-3xl">LUMO</span>
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`transition-colors hover:text-purple-600 ${
                currentSection === item.id ? 'text-purple-600' : 'text-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <span className="text-sm">{glowbits} Glowbits</span>
        </div>
      </div>
    </header>
  );
}