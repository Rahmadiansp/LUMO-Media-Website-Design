import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Trophy, BookOpen, Edit3, Share2, Star, Check } from "lucide-react";

interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  icon: React.ReactNode;
  completed: boolean;
  claimed?: boolean;
}

interface QuestsProps {
  onCompleteQuest: (questId: string, reward: number) => void;
  readArticlesCount: number;
  hasWrittenArticle: boolean;
  hasCustomizedAvatar: boolean;
  claimedQuests?: string[];
}

export function Quests({ 
  onCompleteQuest, 
  readArticlesCount,
  hasWrittenArticle,
  hasCustomizedAvatar,
  claimedQuests = []
}: QuestsProps) {
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
      claimed: claimedQuests.includes("daily-reader"),
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
      claimed: claimedQuests.includes("first-article"),
    },
    {
      id: "avatar-custom",
      title: "Gaya Kamu!",
      description: "Kustomisasi avatarmu",
      reward: 20,
      progress: hasCustomizedAvatar ? 1 : 0,
      total: 1,
      icon: <Star className="w-5 h-5" />,
      completed: hasCustomizedAvatar,
      claimed: claimedQuests.includes("avatar-custom"),
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
      claimed: claimedQuests.includes("share-article"),
    },
  ];

  const handleClaimReward = (quest: Quest) => {
    if (quest.completed && !quest.claimed) {
      onCompleteQuest(quest.id, quest.reward);
    }
  };

  return (
    <Card className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl">Quest Harian</h3>
          <p className="text-sm text-gray-600">Selesaikan untuk dapat Glowbits!</p>
        </div>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`p-4 rounded-2xl bg-white border-2 transition-all ${
              quest.completed 
                ? "border-green-300 bg-green-50" 
                : "border-gray-200 hover:border-purple-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                quest.completed 
                  ? "bg-green-500 text-white" 
                  : "bg-purple-100 text-purple-600"
              }`}>
                {quest.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-medium">{quest.title}</h4>
                    <p className="text-sm text-gray-600">{quest.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 shrink-0">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm">+{quest.reward}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress 
                    value={(quest.progress / quest.total) * 100} 
                    className="h-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {quest.progress}/{quest.total} selesai
                    </span>
                    {quest.completed && !quest.claimed && (
                      <Button
                        size="sm"
                        onClick={() => handleClaimReward(quest)}
                        className="h-7 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Klaim Hadiah
                      </Button>
                    )}
                    {quest.claimed && (
                      <div className="flex items-center gap-1 text-green-500">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Diklaim</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}