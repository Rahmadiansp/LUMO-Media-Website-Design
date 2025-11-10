import { Star, Menu } from "lucide-react";
import logoLumo from "figma:asset/2a37db41870e37d74cc94dca0dcce2ba9cffa1ef.png";

interface HeaderProps {
  glowbits: number;
  onNavigate: (section: string) => void;
  currentSection: string;
  onToggleSidebar: () => void;
}

export function Header({ glowbits, onNavigate, currentSection, onToggleSidebar }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'feeds', label: 'Feeds' },
    { id: 'interactive', label: 'Interaktif & Quiz' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Burger Menu + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            
            <div className="flex items-center gap-2">
              <img src={logoLumo} alt="LUMO" className="w-10 h-10 object-contain" />
              <span className="text-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                LUMO
              </span>
            </div>
          </div>

          {/* Right: Navigation Items */}
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

          {/* Glowbits */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
            <Star className="w-5 h-5 text-orange-500" />
            <span className="text-sm">{glowbits} Glowbits</span>
          </div>
        </div>
      </div>
    </header>
  );
}