import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Lock, Star, ShoppingBag, Palette, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Accessory {
  id: string;
  name: string;
  cost: number;
  category: 'skin' | 'hair' | 'eyes' | 'mouth' | 'clothes' | 'accessories' | 'background';
  owned: boolean;
}

interface AvatarCustomizationProps {
  glowbits: number;
  onPurchase: (cost: number) => void;
}

export function AvatarCustomization({ glowbits, onPurchase }: AvatarCustomizationProps) {
  const [selectedSkin, setSelectedSkin] = useState('skin1');
  const [selectedHair, setSelectedHair] = useState('hair1');
  const [selectedEyes, setSelectedEyes] = useState('eyes1');
  const [selectedMouth, setSelectedMouth] = useState('mouth1');
  const [selectedClothes, setSelectedClothes] = useState('clothes1');
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState('bg1');
  
  const [ownedItems, setOwnedItems] = useState<Set<string>>(
    new Set(['skin1', 'hair1', 'eyes1', 'mouth1', 'clothes1', 'bg1'])
  );

  const accessories: Accessory[] = [
    // Skin tones (free)
    { id: 'skin1', name: 'Terang', cost: 0, category: 'skin', owned: true },
    { id: 'skin2', name: 'Medium', cost: 0, category: 'skin', owned: true },
    { id: 'skin3', name: 'Tan', cost: 0, category: 'skin', owned: true },
    { id: 'skin4', name: 'Gelap', cost: 0, category: 'skin', owned: true },
    
    // Hair styles
    { id: 'hair1', name: 'Pendek', cost: 0, category: 'hair', owned: true },
    { id: 'hair2', name: 'Bob', cost: 30, category: 'hair', owned: false },
    { id: 'hair3', name: 'Panjang', cost: 40, category: 'hair', owned: false },
    { id: 'hair4', name: 'Keriting', cost: 50, category: 'hair', owned: false },
    { id: 'hair5', name: 'Mohawk', cost: 60, category: 'hair', owned: false },
    { id: 'hair6', name: 'Pigtails', cost: 55, category: 'hair', owned: false },
    
    // Eyes
    { id: 'eyes1', name: 'Normal', cost: 0, category: 'eyes', owned: true },
    { id: 'eyes2', name: 'Bintang', cost: 25, category: 'eyes', owned: false },
    { id: 'eyes3', name: 'Hati', cost: 30, category: 'eyes', owned: false },
    { id: 'eyes4', name: 'Sparkle', cost: 35, category: 'eyes', owned: false },
    
    // Mouth
    { id: 'mouth1', name: 'Senyum', cost: 0, category: 'mouth', owned: true },
    { id: 'mouth2', name: 'Grin', cost: 20, category: 'mouth', owned: false },
    { id: 'mouth3', name: 'Tertawa', cost: 25, category: 'mouth', owned: false },
    { id: 'mouth4', name: 'Cute', cost: 30, category: 'mouth', owned: false },
    
    // Clothes
    { id: 'clothes1', name: 'T-Shirt', cost: 0, category: 'clothes', owned: true },
    { id: 'clothes2', name: 'Hoodie', cost: 50, category: 'clothes', owned: false },
    { id: 'clothes3', name: 'Kemeja', cost: 60, category: 'clothes', owned: false },
    { id: 'clothes4', name: 'Jaket', cost: 70, category: 'clothes', owned: false },
    { id: 'clothes5', name: 'Sweater', cost: 65, category: 'clothes', owned: false },
    
    // Accessories
    { id: 'acc1', name: 'Kacamata', cost: 40, category: 'accessories', owned: false },
    { id: 'acc2', name: 'Topi', cost: 45, category: 'accessories', owned: false },
    { id: 'acc3', name: 'Headphone', cost: 55, category: 'accessories', owned: false },
    { id: 'acc4', name: 'Crown', cost: 80, category: 'accessories', owned: false },
    { id: 'acc5', name: 'Bandana', cost: 35, category: 'accessories', owned: false },
    
    // Backgrounds
    { id: 'bg1', name: 'Default', cost: 0, category: 'background', owned: true },
    { id: 'bg2', name: 'Sunset', cost: 50, category: 'background', owned: false },
    { id: 'bg3', name: 'Ocean', cost: 50, category: 'background', owned: false },
    { id: 'bg4', name: 'Forest', cost: 50, category: 'background', owned: false },
    { id: 'bg5', name: 'Galaxy', cost: 80, category: 'background', owned: false },
  ];

  const handlePurchase = (accessory: Accessory) => {
    if (glowbits >= accessory.cost && !ownedItems.has(accessory.id)) {
      onPurchase(accessory.cost);
      setOwnedItems(new Set([...ownedItems, accessory.id]));
      
      // Auto-equip purchased item
      switch (accessory.category) {
        case 'skin': setSelectedSkin(accessory.id); break;
        case 'hair': setSelectedHair(accessory.id); break;
        case 'eyes': setSelectedEyes(accessory.id); break;
        case 'mouth': setSelectedMouth(accessory.id); break;
        case 'clothes': setSelectedClothes(accessory.id); break;
        case 'accessories': setSelectedAccessory(accessory.id); break;
        case 'background': setSelectedBackground(accessory.id); break;
      }
    }
  };

  const toggleAccessory = (accessory: Accessory) => {
    if (!ownedItems.has(accessory.id)) return;
    
    switch (accessory.category) {
      case 'skin': setSelectedSkin(accessory.id); break;
      case 'hair': setSelectedHair(accessory.id); break;
      case 'eyes': setSelectedEyes(accessory.id); break;
      case 'mouth': setSelectedMouth(accessory.id); break;
      case 'clothes': setSelectedClothes(accessory.id); break;
      case 'accessories': 
        setSelectedAccessory(selectedAccessory === accessory.id ? null : accessory.id); 
        break;
      case 'background': setSelectedBackground(accessory.id); break;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2 flex items-center gap-2">
          <Palette className="w-6 h-6" />
          Kustomisasi Avatar
        </h2>
        <p className="text-sm text-gray-600">Buat avatar unik sesuai kepribadianmu!</p>
      </div>

      {/* Avatar Preview */}
      <AvatarPreview
        skinId={selectedSkin}
        hairId={selectedHair}
        eyesId={selectedEyes}
        mouthId={selectedMouth}
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
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 rounded-xl p-1 bg-gray-100">
            <TabsTrigger value="basic" className="rounded-lg text-xs">
              Dasar
            </TabsTrigger>
            <TabsTrigger value="style" className="rounded-lg text-xs">
              Gaya
            </TabsTrigger>
            <TabsTrigger value="premium" className="rounded-lg text-xs">
              Premium
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
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

            {/* Eyes */}
            <div>
              <h4 className="text-sm mb-2">Mata</h4>
              <div className="grid grid-cols-4 gap-2">
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

            {/* Mouth */}
            <div>
              <h4 className="text-sm mb-2">Mulut</h4>
              <div className="grid grid-cols-4 gap-2">
                {accessories.filter(a => a.category === 'mouth').map((accessory) => (
                  <AccessoryButton
                    key={accessory.id}
                    accessory={accessory}
                    owned={ownedItems.has(accessory.id)}
                    selected={selectedMouth === accessory.id}
                    glowbits={glowbits}
                    onPurchase={() => handlePurchase(accessory)}
                    onToggle={() => toggleAccessory(accessory)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4 mt-4">
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
          </TabsContent>

          <TabsContent value="premium" className="space-y-4 mt-4">
            {/* Backgrounds */}
            <div>
              <h4 className="text-sm mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Background
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {accessories.filter(a => a.category === 'background').map((accessory) => (
                  <AccessoryButton
                    key={accessory.id}
                    accessory={accessory}
                    owned={ownedItems.has(accessory.id)}
                    selected={selectedBackground === accessory.id}
                    glowbits={glowbits}
                    onPurchase={() => handlePurchase(accessory)}
                    onToggle={() => toggleAccessory(accessory)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="text-sm text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
        <Star className="w-4 h-4 inline mr-2 text-amber-500" />
        <span>Beli aksesori dengan Glowbits yang kamu dapatkan dari membaca dan menulis berita!</span>
      </div>
    </div>
  );
}

// Avatar Preview Component with SVG
function AvatarPreview({
  skinId,
  hairId,
  eyesId,
  mouthId,
  clothesId,
  accessoryId,
  backgroundId,
}: {
  skinId: string;
  hairId: string;
  eyesId: string;
  mouthId: string;
  clothesId: string;
  accessoryId: string | null;
  backgroundId: string;
}) {
  const skinColors: Record<string, string> = {
    skin1: '#FFE0BD',
    skin2: '#F1C27D',
    skin3: '#C68642',
    skin4: '#8D5524',
  };

  const backgrounds: Record<string, string> = {
    bg1: 'linear-gradient(135deg, #FDE68A 0%, #FCA5A5 50%, #C084FC 100%)',
    bg2: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
    bg3: 'linear-gradient(135deg, #4ECDC4 0%, #44A8F7 100%)',
    bg4: 'linear-gradient(135deg, #95E1D3 0%, #38B000 100%)',
    bg5: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
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

      <svg
        viewBox="0 0 200 200"
        className="w-48 h-48 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head */}
        <circle cx="100" cy="100" r="60" fill={skinColors[skinId]} />
        
        {/* Hair */}
        {hairId === 'hair1' && (
          <path d="M 60 80 Q 50 50, 80 40 Q 100 35, 120 40 Q 150 50, 140 80" fill="#2C1810" />
        )}
        {hairId === 'hair2' && (
          <path d="M 55 90 Q 45 50, 75 45 Q 100 40, 125 45 Q 155 50, 145 90 L 145 100 Q 145 110, 135 115 L 65 115 Q 55 110, 55 100 Z" fill="#6B4423" />
        )}
        {hairId === 'hair3' && (
          <>
            <path d="M 60 80 Q 50 40, 80 35 Q 100 30, 120 35 Q 150 40, 140 80" fill="#8B4513" />
            <path d="M 60 80 L 50 130 Q 55 140, 65 135 L 70 90" fill="#8B4513" />
            <path d="M 140 80 L 150 130 Q 145 140, 135 135 L 130 90" fill="#8B4513" />
          </>
        )}
        {hairId === 'hair4' && (
          <>
            <circle cx="70" cy="60" r="15" fill="#3D2817" />
            <circle cx="90" cy="50" r="15" fill="#3D2817" />
            <circle cx="110" cy="50" r="15" fill="#3D2817" />
            <circle cx="130" cy="60" r="15" fill="#3D2817" />
            <circle cx="80" cy="70" r="12" fill="#3D2817" />
            <circle cx="120" cy="70" r="12" fill="#3D2817" />
          </>
        )}
        {hairId === 'hair5' && (
          <path d="M 90 45 L 85 20 L 95 20 L 92 45 M 95 40 L 92 15 L 102 15 L 100 40 M 100 45 L 98 20 L 108 20 L 105 45" fill="#E74C3C" />
        )}
        {hairId === 'hair6' && (
          <>
            <circle cx="65" cy="75" r="20" fill="#FF69B4" />
            <circle cx="135" cy="75" r="20" fill="#FF69B4" />
            <path d="M 70 65 Q 60 50, 85 45 Q 100 42, 115 45 Q 140 50, 130 65" fill="#FF69B4" />
          </>
        )}

        {/* Eyes */}
        {eyesId === 'eyes1' && (
          <>
            <circle cx="85" cy="95" r="5" fill="#000" />
            <circle cx="115" cy="95" r="5" fill="#000" />
          </>
        )}
        {eyesId === 'eyes2' && (
          <>
            <text x="80" y="100" fontSize="16">⭐</text>
            <text x="110" y="100" fontSize="16">⭐</text>
          </>
        )}
        {eyesId === 'eyes3' && (
          <>
            <text x="80" y="100" fontSize="16">💗</text>
            <text x="110" y="100" fontSize="16">💗</text>
          </>
        )}
        {eyesId === 'eyes4' && (
          <>
            <circle cx="85" cy="95" r="6" fill="#4A90E2" />
            <circle cx="83" cy="93" r="2" fill="#FFF" />
            <circle cx="115" cy="95" r="6" fill="#4A90E2" />
            <circle cx="113" cy="93" r="2" fill="#FFF" />
            <text x="79" y="88" fontSize="8">✨</text>
            <text x="109" y="88" fontSize="8">✨</text>
          </>
        )}

        {/* Mouth */}
        {mouthId === 'mouth1' && (
          <path d="M 85 115 Q 100 120, 115 115" stroke="#000" strokeWidth="2" fill="none" />
        )}
        {mouthId === 'mouth2' && (
          <path d="M 85 112 Q 100 122, 115 112" stroke="#000" strokeWidth="2" fill="none" />
        )}
        {mouthId === 'mouth3' && (
          <>
            <path d="M 82 112 Q 100 125, 118 112" stroke="#000" strokeWidth="2" fill="none" />
            <rect x="90" y="115" width="20" height="8" rx="2" fill="#FFF" />
          </>
        )}
        {mouthId === 'mouth4' && (
          <ellipse cx="100" cy="115" rx="8" ry="5" fill="#FF69B4" />
        )}

        {/* Clothes */}
        {clothesId === 'clothes1' && (
          <rect x="60" y="150" width="80" height="40" rx="8" fill="#3498DB" />
        )}
        {clothesId === 'clothes2' && (
          <>
            <rect x="55" y="150" width="90" height="45" rx="8" fill="#95A5A6" />
            <circle cx="100" cy="165" r="3" fill="#34495E" />
            <circle cx="100" cy="175" r="3" fill="#34495E" />
            <path d="M 75 155 Q 75 145, 85 150" fill="#95A5A6" />
            <path d="M 125 155 Q 125 145, 115 150" fill="#95A5A6" />
          </>
        )}
        {clothesId === 'clothes3' && (
          <>
            <rect x="60" y="150" width="80" height="40" rx="5" fill="#FFF" />
            <rect x="95" y="150" width="10" height="40" fill="#E74C3C" />
          </>
        )}
        {clothesId === 'clothes4' && (
          <>
            <rect x="55" y="150" width="90" height="45" rx="5" fill="#2C3E50" />
            <path d="M 75 150 L 80 155 L 75 160" fill="#34495E" />
          </>
        )}
        {clothesId === 'clothes5' && (
          <rect x="60" y="150" width="80" height="40" rx="8" fill="#E67E22" />
        )}

        {/* Accessories */}
        {accessoryId === 'acc1' && (
          <>
            <rect x="70" y="92" width="25" height="12" rx="2" fill="none" stroke="#000" strokeWidth="2" />
            <rect x="105" y="92" width="25" height="12" rx="2" fill="none" stroke="#000" strokeWidth="2" />
            <line x1="95" y1="98" x2="105" y2="98" stroke="#000" strokeWidth="2" />
          </>
        )}
        {accessoryId === 'acc2' && (
          <path d="M 55 75 L 50 65 L 150 65 L 145 75 Z M 60 75 L 140 75 L 140 80 L 60 80 Z" fill="#E74C3C" />
        )}
        {accessoryId === 'acc3' && (
          <>
            <rect x="40" y="85" width="15" height="20" rx="8" fill="#2C3E50" />
            <rect x="145" y="85" width="15" height="20" rx="8" fill="#2C3E50" />
            <path d="M 55 90 Q 70 70, 100 65 Q 130 70, 145 90" stroke="#2C3E50" strokeWidth="3" fill="none" />
          </>
        )}
        {accessoryId === 'acc4' && (
          <>
            <text x="85" y="55" fontSize="40">👑</text>
          </>
        )}
        {accessoryId === 'acc5' && (
          <rect x="70" y="65" width="60" height="15" rx="3" fill="#F39C12" />
        )}
      </svg>
    </Card>
  );
}

// Color Button for free skin tones
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
