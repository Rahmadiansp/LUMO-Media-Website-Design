import avatarHair from "figma:asset/6fb3b7a527c32ecc67908de706426b7b784ae47f.png";
import avatarFace from "figma:asset/15e8e6e418a0cf2afbc94f8eb37dc5e785b27b61.png";
import avatarBase from "figma:asset/f86af9a1315715da2aea996532ecc253a63f5d97.png";
import clothesBlackStripes from "figma:asset/6eb13ef82f83e24b895c7e1ccf1c15217805a488.png";
import clothesBlueCollar from "figma:asset/a53761e465cec93d59177737b4baa0d5e74244b1.png";
import clothesGreenJacket from "figma:asset/e53304e3849dcbc5410b0f88386f226282a50ecd.png";
import hairShort from "figma:asset/35ac20f014805341c781c70565ae13e68fb30b3a.png";
import faceCute from "figma:asset/1423756a83dd210ef4f43fa911262caa876ffc85.png";
import ribbonPink from "figma:asset/40b69f8edd9b6cc43c3b14618d041ff9daf57981.png";
import type { AvatarConfig } from "../App";

interface AvatarPreviewCompactProps {
  config: AvatarConfig;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarPreviewCompact({ 
  config, 
  size = 'md',
  className = '' 
}: AvatarPreviewCompactProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      {/* Base/Head */}
      <img 
        src={avatarBase} 
        alt="Avatar"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          filter: config.skinId === 'skin1' ? 'hue-rotate(0deg) brightness(1)' :
                 config.skinId === 'skin2' ? 'hue-rotate(10deg) brightness(0.9)' :
                 config.skinId === 'skin3' ? 'hue-rotate(20deg) brightness(0.8)' :
                 'hue-rotate(30deg) brightness(0.7)'
        }}
      />

      {/* Hair */}
      {config.hairId === 'hair1' && (
        <img 
          src={avatarHair} 
          alt="Hair"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      {config.hairId === 'hair2' && (
        <img 
          src={hairShort} 
          alt="Hair"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}

      {/* Face/Eyes */}
      {config.eyesId === 'face1' && (
        <img 
          src={avatarFace} 
          alt="Face"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      {config.eyesId === 'face2' && (
        <img 
          src={faceCute} 
          alt="Face"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}

      {/* Clothes */}
      {config.clothesId === 'clothes6' && (
        <img 
          src={clothesBlackStripes} 
          alt="Clothes"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      {config.clothesId === 'clothes7' && (
        <img 
          src={clothesBlueCollar} 
          alt="Clothes"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
      {config.clothesId === 'clothes8' && (
        <img 
          src={clothesGreenJacket} 
          alt="Clothes"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}

      {/* Accessories */}
      {config.accessoryId === 'acc1' && (
        <img 
          src={ribbonPink} 
          alt="Accessory"
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
    </div>
  );
}
