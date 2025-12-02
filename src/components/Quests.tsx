import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Trophy, BookOpen, Edit3, Share2, Star, Check, Sparkles } from "lucide-react";

interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  icon: React.ReactNode;
  completed: boolean;
}

interface QuestsProps {
  onCompleteQuest: () => void;
}

export function Quests({ onCompleteQuest }: QuestsProps) {
  const [claimedQuests, setClaimedQuests] = useState<string[]>([]);
  
  // Mock progress data - in real app would come from user state
  const readArticlesCount = 2;
  const hasWrittenArticle = true;
  const hasCustomizedAvatar = false;

  const quests: Quest[] = [
    {
      id: "daily-reader",
      title: "Pembaca Aktif",
      description: "Baca 3 artikel hari ini",
      reward: 30,
      progress: Math.min(readArticlesCount, 3),
      total: 3,
      icon: <BookOpen className="w-5 h-5" />,
      completed: readArticlesCount >= 3,
    },
    {
      id: "first-article",
      title: "Jurnalis Pemula",
      description: "Tulis artikel pertamamu",
      reward: 50,
      progress: hasWrittenArticle ? 1 : 0,
      total: 1,
      icon: <Edit3 className="w-5 h-5" />,
      completed: hasWrittenArticle,
    },
    {
      id: "avatar-custom",
      title: "Gaya Kamu!",
      description: "Kustomisasi avatarmu",
      reward: 20,
      progress: hasCustomizedAvatar ? 1 : 0,
      total: 1,
      icon: <Sparkles className="w-5 h-5" />,
      completed: hasCustomizedAvatar,
    },
    {
      id: "share-article",
      title: "Berbagi Pengetahuan",
      description: "Bagikan 1 artikel ke teman",
      reward: 25,
      progress: 0,
      total: 1,
      icon: <Share2 className="w-5 h-5" />,
      completed: false,
    },
  ];

  const handleClaimReward = (quest: Quest) => {
    if (quest.completed && !claimedQuests.includes(quest.id)) {
      setClaimedQuests([...claimedQuests, quest.id]);
      onCompleteQuest();
    }
  };

  const completedCount = quests.filter(q => q.completed).length;
  const totalQuests = quests.length;

  return (
    <Card className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-2 border-purple-200 shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-md">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl">Quest Harian</h3>
            <p className="text-sm text-gray-600">Selesaikan untuk dapat Glowbits!</p>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="mt-4 p-4 bg-white/60 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress Hari Ini</span>
            <span className="text-sm">{completedCount}/{totalQuests} selesai</span>
          </div>
          <Progress 
            value={(completedCount / totalQuests) * 100} 
            className="h-3"
          />
        </div>
      </div>

      {/* Quest List */}
      <div className="space-y-3">
        {quests.map((quest) => {
          const isClaimed = claimedQuests.includes(quest.id);
          
          return (
            <div
              key={quest.id}
              className={`p-5 rounded-2xl border-2 transition-all ${
                quest.completed 
                  ? isClaimed
                    ? "bg-gray-50 border-gray-300"
                    : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-md" 
                  : "bg-white border-purple-200 hover:border-purple-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-xl shrink-0 transition-all ${
                  quest.completed 
                    ? isClaimed
                      ? "bg-gray-300 text-gray-600"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md" 
                    : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600"
                }`}>
                  {quest.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className={`mb-1 ${isClaimed ? 'text-gray-500' : ''}`}>
                        {quest.title}
                      </h4>
                      <p className="text-sm text-gray-600">{quest.description}</p>
                    </div>
                    <div className={`flex items-center gap-1 shrink-0 ${
                      isClaimed ? 'text-gray-400' : 'text-amber-600'
                    }`}>
                      <Star className={`w-5 h-5 ${isClaimed ? '' : 'fill-amber-400'}`} />
                      <span>+{quest.reward}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress 
                      value={(quest.progress / quest.total) * 100} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {quest.progress}/{quest.total} selesai
                      </span>
                      
                      {/* Action Button */}
                      {quest.completed && !isClaimed && (
                        <Button
                          size="sm"
                          onClick={() => handleClaimReward(quest)}
                          className="h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md"
                        >
                          <Star className="w-4 h-4 mr-1 fill-white" />
                          Klaim Hadiah
                        </Button>
                      )}
                      {isClaimed && (
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <Check className="w-4 h-4" />
                          <span>Diklaim</span>
                        </div>
                      )}
                      {!quest.completed && (
                        <span className="text-xs text-purple-600">
                          Belum selesai
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Message */}
      {completedCount === 0 && (
        <div className="mt-6 p-4 bg-white/60 rounded-2xl text-center border border-purple-200">
          <p className="text-sm text-gray-600">
            🎯 Yuk mulai selesaikan quest pertamamu hari ini!
          </p>
        </div>
      )}
      
      {completedCount === totalQuests && !quests.some(q => !claimedQuests.includes(q.id)) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl text-center border-2 border-orange-300">
          <p className="text-lg mb-1">🎉 Semua Quest Selesai!</p>
          <p className="text-sm text-gray-700">
            Keren! Quest baru akan muncul besok
          </p>
        </div>
      )}
    </Card>
  );
}
