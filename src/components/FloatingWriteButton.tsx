import { Pencil } from "lucide-react";
import { useState } from "react";

interface FloatingWriteButtonProps {
  onClick: () => void;
}

export function FloatingWriteButton({ onClick }: FloatingWriteButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3 group"
      style={{
        padding: isHovered ? '16px 24px' : '16px',
        width: isHovered ? 'auto' : '64px',
        height: '64px',
      }}
    >
      <Pencil className="w-6 h-6 flex-shrink-0" />
      <span 
        className="overflow-hidden transition-all duration-300 whitespace-nowrap"
        style={{
          width: isHovered ? '120px' : '0px',
          opacity: isHovered ? 1 : 0,
        }}
      >
        Tulis Berita
      </span>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100" />
    </button>
  );
}
