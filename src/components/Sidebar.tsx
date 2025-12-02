import { X, User, Info, BarChart3, LogOut, HelpCircle, Edit2, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  currentSection: string;
  userName: string;
  onUpdateNickname?: (newNickname: string) => Promise<boolean>;
}

export function Sidebar({ isOpen, onClose, onNavigate, currentSection, userName, onUpdateNickname }: SidebarProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const [isSaving, setIsSaving] = useState(false);

  const menuItems = [
    { id: 'profile', label: 'Profil Saya', icon: User },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'about', label: 'Tentang Kami', icon: Info },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    onClose();
  };

  const handleSaveName = async () => {
    if (!onUpdateNickname || editedName.trim() === '' || editedName === userName) {
      setIsEditingName(false);
      setEditedName(userName);
      return;
    }

    setIsSaving(true);
    try {
      const success = await onUpdateNickname(editedName.trim());
      
      if (success) {
        setIsEditingName(false);
      } else {
        setEditedName(userName);
        setIsEditingName(false);
        alert('Gagal mengupdate nickname. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error updating nickname:', error);
      setEditedName(userName);
      setIsEditingName(false);
      alert('Terjadi kesalahan saat mengupdate nickname.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditedName(userName);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-[#0360fd] to-[#fe9ecd]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-white">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-[#0360fd]" />
              </div>
              <div className="flex-1">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="bg-white text-gray-900 h-8 text-sm"
                      disabled={isSaving}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName();
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      disabled={isSaving}
                      className="p-1 bg-white rounded hover:bg-gray-100 transition-colors"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={isSaving}
                      className="p-1 bg-white rounded hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-white">{userName}</p>
                      <p className="text-sm text-white/80">Jurnalis LUMO</p>
                    </div>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0360fd] to-[#fe9ecd] text-white shadow-lg'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="bg-gradient-to-br from-[#0360fd]/10 to-[#fe9ecd]/10 p-4 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">LUMO</p>
              <p className="text-xs text-gray-500">Kata Kita, Suara Dunia</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}