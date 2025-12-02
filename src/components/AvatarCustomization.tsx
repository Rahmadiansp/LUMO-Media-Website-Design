import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Lock, Star, ShoppingBag, Palette } from "lucide-react";
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

interface Accessory {
  id: string;
  name: string;
  cost: number;
  category: 'skin' | 'hair' | 'eyes' | 'clothes' | 'accessories' | 'background';
  owned: boolean;
}

interface AvatarCustomizationProps {
  glowbits: number;
  onPurchase: (cost: number, itemId: string) => boolean;
  onClose: () => void;
  avatarConfig: AvatarConfig;
  setAvatarConfig: (config: AvatarConfig) => void;
  purchasedItems: Set<string>;
}

export function AvatarCustomization({ 
  glowbits, 
  onPurchase, 
  onClose,
  avatarConfig,
  setAvatarConfig,
  purchasedItems 
}: AvatarCustomizationProps) {
  const [selectedSkin, setSelectedSkin] = useState(avatarConfig.skinId);
  const [selectedHair, setSelectedHair] = useState(avatarConfig.hairId);
  const [selectedEyes, setSelectedEyes] = useState(avatarConfig.eyesId);
  const [selectedClothes, setSelectedClothes] = useState(avatarConfig.clothesId);
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(avatarConfig.accessoryId);
  const [selectedBackground, setSelectedBackground] = useState(avatarConfig.backgroundId);
  
  const [ownedItems, setOwnedItems] = useState<Set<string>>(purchasedItems);

  // Initialize local state from props only once on mount
  useEffect(() => {
    setSelectedSkin(avatarConfig.skinId);
    setSelectedHair(avatarConfig.hairId);
    setSelectedEyes(avatarConfig.eyesId);
    setSelectedClothes(avatarConfig.clothesId);
    setSelectedAccessory(avatarConfig.accessoryId);
    setSelectedBackground(avatarConfig.backgroundId);
    setOwnedItems(purchasedItems);
  }, []); // Empty dependency array - only run on mount

  // Save changes when closing
  const handleClose = () => {
    const newConfig: AvatarConfig = {
      skinId: selectedSkin,
      hairId: selectedHair,
      eyesId: selectedEyes,
      clothesId: selectedClothes,
      accessoryId: selectedAccessory,
      backgroundId: selectedBackground,
    };
    setAvatarConfig(newConfig);
    onClose();
  };

  const accessories: Accessory[] = [
    // Skin tones (gratis)
    { id: 'skin1', name: 'Terang', cost: 0, category: 'skin', owned: true },
    { id: 'skin2', name: 'Medium', cost: 0, category: 'skin', owned: true },
    { id: 'skin3', name: 'Tan', cost: 0, category: 'skin', owned: true },
    { id: 'skin4', name: 'Gelap', cost: 0, category: 'skin', owned: true },
    
    // Hair - dengan asset
    { id: 'hair1', name: 'Maroon Long', cost: 0, category: 'hair', owned: true },
    { id: 'hair2', name: 'Short Bob', cost: 50, category: 'hair', owned: false },
    
    // Face - dengan asset
    { id: 'face1', name: 'Default', cost: 0, category: 'eyes', owned: true },
    { id: 'face2', name: 'Cute Eyes', cost: 40, category: 'eyes', owned: false },
    
    // Clothes - dengan asset
    { id: 'clothes6', name: 'Stripes', cost: 0, category: 'clothes', owned: true },
    { id: 'clothes7', name: 'Collar', cost: 55, category: 'clothes', owned: false },
    { id: 'clothes8', name: 'Jacket', cost: 65, category: 'clothes', owned: false },
    
    // Accessories - dengan asset
    { id: 'acc1', name: 'Pink Ribbon', cost: 60, category: 'accessories', owned: false },
    
    // Backgrounds
    { id: 'bg1', name: 'Default', cost: 0, category: 'background', owned: true },
  ];

  const handlePurchase = (accessory: Accessory) => {
    if (glowbits >= accessory.cost && !ownedItems.has(accessory.id)) {
      const success = onPurchase(accessory.cost, accessory.id);
      if (success) {
        setOwnedItems(new Set([...ownedItems, accessory.id]));
        
        // Auto-equip purchased item
        switch (accessory.category) {
          case 'skin': setSelectedSkin(accessory.id); break;
          case 'hair': setSelectedHair(accessory.id); break;
          case 'eyes': setSelectedEyes(accessory.id); break;
          case 'clothes': setSelectedClothes(accessory.id); break;
          case 'accessories': setSelectedAccessory(accessory.id); break;
          case 'background': setSelectedBackground(accessory.id); break;
        }
      }
    }
  };

  const toggleAccessory = (accessory: Accessory) => {
    if (!ownedItems.has(accessory.id)) return;
    
    switch (accessory.category) {
      case 'skin': setSelectedSkin(accessory.id); break;
      case 'hair': setSelectedHair(accessory.id); break;
      case 'eyes': setSelectedEyes(accessory.id); break;
      case 'clothes': setSelectedClothes(accessory.id); break;
      case 'accessories': 
        setSelectedAccessory(selectedAccessory === accessory.id ? null : accessory.id); 
        break;
      case 'background': setSelectedBackground(accessory.id); break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Button
            onClick={handleClose}
            variant="ghost"
            className="mb-4 rounded-full hover:bg-white/80"
          >
            <span className="mr-2">←</span> Kembali
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-3">
                <Palette className="w-10 h-10 text-purple-600" />
                Kustomisasi Avatar
              </h1>
              <p className="text-lg text-gray-600">Buat avatar unik sesuai kepribadianmu!</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Glowbits Saya</p>
              <p className="text-3xl bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                {glowbits}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Avatar Preview */}
          <AvatarPreview
            skinId={selectedSkin}
            hairId={selectedHair}
            eyesId={selectedEyes}
            clothesId={selectedClothes}
            accessoryId={selectedAccessory}
            backgroundId={selectedBackground}
          />

          {/* Accessories Shop */}
          <div>
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Toko Aksesori
            </h3>
            
            <div className="space-y-6">
              {/* Skin Tones */}
              <div>
                <h4 className="text-sm mb-2 flex items-center gap-2">
                  <span>Warna Kulit</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Gratis</span>
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {accessories.filter(a => a.category === 'skin').map((accessory) => (
                    <ColorButton
                      key={accessory.id}
                      accessory={accessory}
                      selected={selectedSkin === accessory.id}
                      onToggle={() => toggleAccessory(accessory)}
                    />
                  ))}
                </div>
              </div>

              {/* Hair */}
              <div>
                <h4 className="text-sm mb-2">Rambut</h4>
                <div className="grid grid-cols-3 gap-2">
                  {accessories.filter(a => a.category === 'hair').map((accessory) => (
                    <AccessoryButton
                      key={accessory.id}
                      accessory={accessory}
                      owned={ownedItems.has(accessory.id)}
                      selected={selectedHair === accessory.id}
                      glowbits={glowbits}
                      onPurchase={() => handlePurchase(accessory)}
                      onToggle={() => toggleAccessory(accessory)}
                    />
                  ))}
                </div>
              </div>

              {/* Face */}
              <div>
                <h4 className="text-sm mb-2">Wajah</h4>
                <div className="grid grid-cols-3 gap-2">
                  {accessories.filter(a => a.category === 'eyes').map((accessory) => (
                    <AccessoryButton
                      key={accessory.id}
                      accessory={accessory}
                      owned={ownedItems.has(accessory.id)}
                      selected={selectedEyes === accessory.id}
                      glowbits={glowbits}
                      onPurchase={() => handlePurchase(accessory)}
                      onToggle={() => toggleAccessory(accessory)}
                    />
                  ))}
                </div>
              </div>

              {/* Clothes */}
              <div>
                <h4 className="text-sm mb-2">Pakaian</h4>
                <div className="grid grid-cols-3 gap-2">
                  {accessories.filter(a => a.category === 'clothes').map((accessory) => (
                    <AccessoryButton
                      key={accessory.id}
                      accessory={accessory}
                      owned={ownedItems.has(accessory.id)}
                      selected={selectedClothes === accessory.id}
                      glowbits={glowbits}
                      onPurchase={() => handlePurchase(accessory)}
                      onToggle={() => toggleAccessory(accessory)}
                    />
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div>
                <h4 className="text-sm mb-2">Aksesori</h4>
                <div className="grid grid-cols-3 gap-2">
                  {accessories.filter(a => a.category === 'accessories').map((accessory) => (
                    <AccessoryButton
                      key={accessory.id}
                      accessory={accessory}
                      owned={ownedItems.has(accessory.id)}
                      selected={selectedAccessory === accessory.id}
                      glowbits={glowbits}
                      onPurchase={() => handlePurchase(accessory)}
                      onToggle={() => toggleAccessory(accessory)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
            <Star className="w-4 h-4 inline mr-2 text-amber-500" />
            <span>Beli aksesori dengan Glowbits yang kamu dapatkan dari membaca dan menulis berita!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Avatar Preview Component
function AvatarPreview({
  skinId,
  hairId,
  eyesId,
  clothesId,
  accessoryId,
  backgroundId,
}: {
  skinId: string;
  hairId: string;
  eyesId: string;
  clothesId: string;
  accessoryId: string | null;
  backgroundId: string;
}) {
  const backgrounds: Record<string, string> = {
    bg1: 'linear-gradient(135deg, #FDE68A 0%, #FCA5A5 50%, #C084FC 100%)',
  };

  return (
    <Card 
      className="p-8 rounded-3xl relative overflow-hidden"
      style={{ background: backgrounds[backgroundId] }}
    >
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 text-2xl animate-pulse">✨</div>
      <div className="absolute top-8 right-8 text-2xl animate-pulse delay-100">⭐</div>
      <div className="absolute bottom-4 right-4 text-2xl animate-pulse delay-200">💫</div>

      <div className="relative w-64 h-64 mx-auto">
        {/* Base/Head */}
        <img 
          src={avatarBase} 
          alt="Avatar Base"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            filter: skinId === 'skin1' ? 'hue-rotate(0deg) brightness(1)' :
                   skinId === 'skin2' ? 'hue-rotate(10deg) brightness(0.9)' :
                   skinId === 'skin3' ? 'hue-rotate(20deg) brightness(0.8)' :
                   'hue-rotate(30deg) brightness(0.7)'
          }}
        />

        {/* Hair */}
        {hairId === 'hair1' && (
          <img 
            src={avatarHair} 
            alt="Maroon Long Hair"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
        {hairId === 'hair2' && (
          <img 
            src={hairShort} 
            alt="Short Bob Hair"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}

        {/* Face/Eyes */}
        {eyesId === 'face1' && (
          <img 
            src={avatarFace} 
            alt="Default Face"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
        {eyesId === 'face2' && (
          <img 
            src={faceCute} 
            alt="Cute Face"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}

        {/* Clothes */}
        {clothesId === 'clothes6' && (
          <img 
            src={clothesBlackStripes} 
            alt="Black Stripes Shirt"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
        {clothesId === 'clothes7' && (
          <img 
            src={clothesBlueCollar} 
            alt="Blue Collar Shirt"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
        {clothesId === 'clothes8' && (
          <img 
            src={clothesGreenJacket} 
            alt="Green Jacket"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}

        {/* Accessories */}
        {accessoryId === 'acc1' && (
          <img 
            src={ribbonPink} 
            alt="Pink Ribbon"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
      </div>
    </Card>
  );
}

// Color Button for skin tones
function ColorButton({
  accessory,
  selected,
  onToggle,
}: {
  accessory: Accessory;
  selected: boolean;
  onToggle: () => void;
}) {
  const colors: Record<string, string> = {
    skin1: '#FFE0BD',
    skin2: '#F1C27D',
    skin3: '#C68642',
    skin4: '#8D5524',
  };

  return (
    <button
      onClick={onToggle}
      className={`
        relative p-3 rounded-xl border-2 transition-all
        ${selected ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 bg-white hover:border-purple-300'}
      `}
    >
      <div 
        className="w-full h-8 rounded-lg mb-1" 
        style={{ backgroundColor: colors[accessory.id] }}
      />
      <div className="text-xs">{accessory.name}</div>
      {selected && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
          ✓
        </div>
      )}
    </button>
  );
}

// Accessory Button
interface AccessoryButtonProps {
  accessory: Accessory;
  owned: boolean;
  selected: boolean;
  glowbits: number;
  onPurchase: () => void;
  onToggle: () => void;
}

function AccessoryButton({ 
  accessory, 
  owned, 
  selected, 
  glowbits,
  onPurchase, 
  onToggle 
}: AccessoryButtonProps) {
  const canAfford = glowbits >= accessory.cost;

  return (
    <button
      onClick={owned ? onToggle : onPurchase}
      disabled={!owned && !canAfford}
      className={`
        relative p-3 rounded-xl border-2 transition-all
        ${selected ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 bg-white'}
        ${!owned && !canAfford ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-300 hover:shadow-md'}
      `}
    >
      <div className="text-xs mb-1">{accessory.name}</div>
      
      {!owned && (
        <div className="flex items-center justify-center gap-1 mt-1 text-xs">
          {canAfford ? (
            <>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-amber-600">{accessory.cost}</span>
            </>
          ) : (
            <>
              <Lock className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">{accessory.cost}</span>
            </>
          )}
        </div>
      )}
      
      {owned && (
        <div className="mt-1 text-xs text-green-600">✓ Dimiliki</div>
      )}
      
      {selected && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
          ✓
        </div>
      )}
    </button>
  );
}