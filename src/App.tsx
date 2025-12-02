import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { HeroSection } from "./components/HeroSection";
import { HeadlineNews } from "./components/HeadlineNews";
import { Feeds } from "./components/Feeds";
import { Profile } from "./components/Profile";
import { WriteArticle } from "./components/WriteArticle";
import { ArticleReader } from "./components/ArticleReader";
import { AvatarCustomization } from "./components/AvatarCustomization";
import { Quests } from "./components/Quests";
import { Quiz } from "./components/Quiz";
import { Leaderboard } from "./components/Leaderboard";
import { InteractiveNews } from "./components/InteractiveNews";
import { Insights } from "./components/Insights";
import { FAQ } from "./components/FAQ";
import { FloatingWriteButton } from "./components/FloatingWriteButton";
import { projectId, publicAnonKey } from './utils/supabase/info';

export interface AvatarConfig {
  skinId: string;
  hairId: string;
  eyesId: string;
  clothesId: string;
  accessoryId: string | null;
  backgroundId: string;
}

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<"landing" | "login" | "register">("landing");
  
  // User State
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [glowbits, setGlowbits] = useState(350);
  
  // Avatar State
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({
    skinId: 'skin1',
    hairId: 'hair1',
    eyesId: 'face1',
    clothesId: 'clothes6',
    accessoryId: null,
    backgroundId: 'bg1',
  });
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(
    new Set(['skin1', 'skin2', 'skin3', 'skin4', 'hair1', 'face1', 'clothes6', 'bg1'])
  );
  
  // Navigation State
  const [currentSection, setCurrentSection] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  
  // UI State
  const [isWriting, setIsWriting] = useState(false);
  const [isCustomizingAvatar, setIsCustomizingAvatar] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any | null>(null);

  // Load user profile when authenticated
  useEffect(() => {
    if (isAuthenticated && userEmail) {
      fetchUserProfile();
    }
  }, [isAuthenticated, userEmail]);

  // Sync glowbits to server periodically
  useEffect(() => {
    if (isAuthenticated && userEmail) {
      const syncInterval = setInterval(() => {
        syncGlowbitsToServer();
      }, 30000); // Sync every 30 seconds

      return () => clearInterval(syncInterval);
    }
  }, [isAuthenticated, userEmail, glowbits]);

  // Sync avatar configuration when it changes
  useEffect(() => {
    if (isAuthenticated && userEmail) {
      syncAvatarToServer(avatarConfig, Array.from(purchasedItems));
    }
  }, [avatarConfig, purchasedItems, isAuthenticated, userEmail]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/profile`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserName(data.user.nickname);
        setGlowbits(data.user.glowbits);
        
        // Handle avatar config with defaults
        if (data.user.avatarConfig) {
          setAvatarConfig(data.user.avatarConfig);
        }
        
        // Handle purchased items with defaults
        if (data.user.purchasedItems) {
          setPurchasedItems(new Set(data.user.purchasedItems));
        }
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const syncGlowbitsToServer = async () => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/glowbits`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: userEmail,
            glowbits 
          }),
        }
      );
    } catch (err) {
      console.error('Error syncing glowbits:', err);
    }
  };

  const syncAvatarToServer = async (config: AvatarConfig, items: string[]) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/avatar`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: userEmail,
            avatarConfig: config,
            purchasedItems: items
          }),
        }
      );
    } catch (err) {
      console.error('Error syncing avatar:', err);
    }
  };

  const updateNickname = async (newNickname: string) => {
    try {
      console.log('Updating nickname to:', newNickname, 'for email:', userEmail);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/nickname`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: userEmail,
            nickname: newNickname 
          }),
        }
      );

      console.log('Update nickname response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Update nickname success:', data);
        setUserName(newNickname);
        return true;
      } else {
        const errorData = await response.json();
        console.error('Update nickname failed:', errorData);
        return false;
      }
    } catch (err) {
      console.error('Error updating nickname:', err);
      return false;
    }
  };

  // Authentication Handlers
  const handleLogin = async (email: string, password: string) => {
    // Set user state
    setUserEmail(email);
    const extractedName = email.split("@")[0];
    setUserName(extractedName);
    setIsAuthenticated(true);
    setAuthView("landing");
    setCurrentSection("home");
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    // Set user state
    setUserEmail(email);
    setUserName(name);
    setIsAuthenticated(true);
    setAuthView("landing");
    setCurrentSection("home");
  };

  const handleLogout = () => {
    // Sync glowbits before logout
    syncGlowbitsToServer();
    
    setIsAuthenticated(false);
    setAuthView("landing");
    setCurrentSection("home");
    setUserEmail("");
    setUserName("");
    setGlowbits(350);
  };

  // Navigation Handlers
  const handleNavigate = (section: string) => {
    if (section === "logout") {
      handleLogout();
    } else {
      setCurrentSection(section);
      setSelectedArticleId(null);
      setIsWriting(false);
      setIsCustomizingAvatar(false);
    }
  };

  const handleReadArticle = async (articleId: string) => {
    setSelectedArticleId(articleId);
    
    // Update articlesRead count on server
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/profile`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const updatedArticlesRead = (data.user.articlesRead || 0) + 1;
        
        // Update the articlesRead field
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/stats`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              email: userEmail,
              articlesRead: updatedArticlesRead
            }),
          }
        );
      }
    } catch (err) {
      console.error('Error updating articles read:', err);
    }
  };

  const handleArticleRewardEarned = (reward: number) => {
    setGlowbits(prev => prev + reward);
  };

  const handleCloseArticle = () => {
    setSelectedArticleId(null);
  };

  const handleWriteArticle = () => {
    setIsWriting(true);
  };

  const handleSubmitArticle = async () => {
    setIsWriting(false);
    // Award glowbits for writing
    setGlowbits(prev => prev + 50);
    
    // Update articlesWritten count on server
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/profile`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const updatedArticlesWritten = (data.user.articlesWritten || 0) + 1;
        
        // Update the articlesWritten field
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/stats`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              email: userEmail,
              articlesWritten: updatedArticlesWritten
            }),
          }
        );
      }
    } catch (err) {
      console.error('Error updating articles written:', err);
    }
  };

  const handleOpenAvatarCustomization = () => {
    setIsCustomizingAvatar(true);
  };

  const handleCloseAvatarCustomization = () => {
    setIsCustomizingAvatar(false);
  };

  const handlePurchaseItem = (cost: number, itemId: string) => {
    if (glowbits >= cost) {
      setGlowbits(prev => prev - cost);
      setPurchasedItems(prev => new Set([...prev, itemId]));
      return true;
    }
    return false;
  };

  // Render authentication views
  if (!isAuthenticated) {
    if (authView === "login") {
      return (
        <Login
          onLogin={handleLogin}
          onNavigateToRegister={() => setAuthView("register")}
          onNavigateToLanding={() => setAuthView("landing")}
        />
      );
    }

    if (authView === "register") {
      return (
        <Register
          onRegister={handleRegister}
          onNavigateToLogin={() => setAuthView("login")}
          onNavigateToLanding={() => setAuthView("landing")}
        />
      );
    }

    return (
      <LandingPage
        onNavigateToLogin={() => setAuthView("login")}
        onNavigateToRegister={() => setAuthView("register")}
      />
    );
  }

  // Render article reader if article is selected
  if (selectedArticleId) {
    return (
      <ArticleReader
        articleId={selectedArticleId}
        onClose={handleCloseArticle}
        glowbits={glowbits}
        onRewardEarned={handleArticleRewardEarned}
      />
    );
  }

  // Render write article view
  if (isWriting || editingArticle) {
    return (
      <WriteArticle
        onSubmit={() => {
          handleSubmitArticle();
          setEditingArticle(null);
        }}
        onCancel={() => {
          setIsWriting(false);
          setEditingArticle(null);
        }}
        userName={userName}
        userEmail={userEmail}
        editArticle={editingArticle}
      />
    );
  }

  // Render avatar customization
  if (isCustomizingAvatar) {
    return (
      <AvatarCustomization
        glowbits={glowbits}
        onPurchase={handlePurchaseItem}
        onClose={handleCloseAvatarCustomization}
        avatarConfig={avatarConfig}
        setAvatarConfig={setAvatarConfig}
        purchasedItems={purchasedItems}
      />
    );
  }

  // Render main app content
  return (
    <div className="min-h-screen bg-white">
      <Header
        glowbits={glowbits}
        onNavigate={handleNavigate}
        currentSection={currentSection}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigate}
        currentSection={currentSection}
        userName={userName}
        onUpdateNickname={updateNickname}
      />

      <main className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        {/* Home Section */}
        {currentSection === "home" && (
          <div className="space-y-8">
            <HeroSection
              userName={userName}
              glowbits={glowbits}
              onOpenAvatar={handleOpenAvatarCustomization}
              avatarConfig={avatarConfig}
            />
            <HeadlineNews onReadArticle={handleReadArticle} />
            
            {/* Leaderboard & Avatar Customization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Leaderboard 
                  currentUserGlowbits={glowbits}
                  currentUserName={userName}
                />
              </div>
              <div>
                <button
                  onClick={handleOpenAvatarCustomization}
                  className="w-full p-8 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-3xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-purple-300"
                >
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-2xl mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    Kustomisasi Avatar
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Buat avatar unik sesuai kepribadianmu! Beli aksesori dengan Glowbits yang kamu miliki.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full text-purple-600">
                    <span>✨ {glowbits} Glowbits tersedia</span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => handleNavigate("feeds")}
                className="p-6 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-2">📰</div>
                <h3 className="text-xl mb-2">Baca Feeds</h3>
                <p className="text-sm text-gray-600">Jelajahi berita terbaru dari komunitas</p>
              </button>

              <button
                onClick={() => setCurrentSection("interactive")}
                className="p-6 bg-white rounded-3xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-xl mb-2">Quiz & Games</h3>
                <p className="text-sm text-gray-600">Uji literasi media dan raih glowbits</p>
              </button>

              <button
                onClick={handleWriteArticle}
                className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-2">✍️</div>
                <h3 className="text-xl mb-2">Tulis Berita</h3>
                <p className="text-sm text-purple-100">Bagikan ceritamu dan raih 50 Glowbits</p>
              </button>
            </div>
          </div>
        )}

        {/* Feeds Section */}
        {currentSection === "feeds" && (
          <Feeds onReadArticle={handleReadArticle} />
        )}

        {/* Profile Section */}
        {currentSection === "profile" && (
          <Profile
            userName={userName}
            userEmail={userEmail}
            glowbits={glowbits}
            onOpenAvatar={handleOpenAvatarCustomization}
            onEditArticle={(article) => setEditingArticle(article)}
          />
        )}

        {/* Interactive & Quiz Section */}
        {currentSection === "interactive" && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Zona Interaktif
              </h1>
              <p className="text-lg text-gray-600">
                Uji pengetahuanmu, selesaikan quest, dan naik ke puncak leaderboard!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Quests onCompleteQuest={() => setGlowbits(prev => prev + 25)} />
              </div>
              <div>
                <Leaderboard 
                  currentUserGlowbits={glowbits}
                  currentUserName={userName}
                />
              </div>
            </div>

            <Quiz onCompleteQuiz={() => setGlowbits(prev => prev + 30)} />
            
            <InteractiveNews />
          </div>
        )}

        {/* Insights Section */}
        {currentSection === "insights" && (
          <Insights userName={userName} userEmail={userEmail} />
        )}

        {/* FAQ Section */}
        {currentSection === "faq" && <FAQ />}

        {/* About Section */}
        {currentSection === "about" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h1 className="text-4xl mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Tentang LUMO
              </h1>
              
              <div className="space-y-6 text-gray-700">
                <div>
                  <h2 className="text-2xl mb-3">Kata Kita, Suara Dunia</h2>
                  <p className="mb-4">
                    LUMO adalah platform jurnalisme kontemporer yang dirancang khusus untuk remaja Indonesia 
                    berusia 12-17 tahun. Kami percaya bahwa setiap anak muda memiliki suara yang penting dan 
                    cerita yang layak didengar.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl mb-3">Misi Kami</h3>
                  <p className="mb-4">
                    Memberdayakan generasi muda Indonesia melalui partisipasi aktif dalam jurnalisme, 
                    meningkatkan literasi media, dan menciptakan ruang aman untuk berbagi perspektif.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl mb-3">Fitur Utama</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Platform penulisan artikel jurnalistik untuk remaja</li>
                    <li>Sistem gamifikasi dengan Glowbits sebagai mata uang virtual</li>
                    <li>Kustomisasi avatar dengan berbagai aksesori</li>
                    <li>Quest harian dan quiz literasi media</li>
                    <li>Leaderboard kompetisi antar pengguna</li>
                    <li>Konten interaktif: polling, fact-checking, mini games</li>
                    <li>Pemisahan berita redaksi LUMO dan artikel buatan pengguna</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl mt-8">
                  <p className="text-center italic">
                    "Di LUMO, suaramu bukan hanya didengar—tapi juga dihargai, dirayakan, dan 
                    menjadi bagian dari perubahan untuk Indonesia yang lebih baik."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Write Button */}
      <FloatingWriteButton onClick={handleWriteArticle} />
    </div>
  );
}