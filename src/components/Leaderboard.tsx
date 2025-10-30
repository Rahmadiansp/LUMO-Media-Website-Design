import { Card } from "./ui/card";
import { Crown, Medal, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface LeaderboardUser {
  id: string;
  name: string;
  glowbits: number;
  articlesRead: number;
  articlesWritten: number;
  rank: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  currentUserGlowbits: number;
  currentUserName?: string;
}

export function Leaderboard({ currentUserGlowbits, currentUserName = "Kamu" }: LeaderboardProps) {
  // Mock data untuk leaderboard
  const users: LeaderboardUser[] = [
    {
      id: "1",
      name: "Rani Pratiwi",
      glowbits: 2450,
      articlesRead: 87,
      articlesWritten: 23,
      rank: 1,
    },
    {
      id: "2",
      name: "Budi Santoso",
      glowbits: 2180,
      articlesRead: 76,
      articlesWritten: 19,
      rank: 2,
    },
    {
      id: "3",
      name: "Siti Nurhaliza",
      glowbits: 1950,
      articlesRead: 65,
      articlesWritten: 17,
      rank: 3,
    },
    {
      id: "4",
      name: "Andi Wijaya",
      glowbits: 1720,
      articlesRead: 58,
      articlesWritten: 15,
      rank: 4,
    },
    {
      id: "5",
      name: "Maya Kusuma",
      glowbits: 1580,
      articlesRead: 52,
      articlesWritten: 14,
      rank: 5,
    },
    {
      id: "6",
      name: "Dimas Aditya",
      glowbits: 1420,
      articlesRead: 48,
      articlesWritten: 12,
      rank: 6,
    },
    {
      id: "7",
      name: "Lina Marlina",
      glowbits: 1290,
      articlesRead: 43,
      articlesWritten: 11,
      rank: 7,
    },
    {
      id: "8",
      name: "Rizky Firmansyah",
      glowbits: 1150,
      articlesRead: 39,
      articlesWritten: 10,
      rank: 8,
    },
    {
      id: "9",
      name: "Putri Ayu",
      glowbits: 1080,
      articlesRead: 36,
      articlesWritten: 9,
      rank: 9,
    },
    {
      id: "10",
      name: "Fajar Ramadhan",
      glowbits: 950,
      articlesRead: 32,
      articlesWritten: 8,
      rank: 10,
    },
  ];

  // Tentukan posisi user saat ini
  const getCurrentUserRank = () => {
    const rank = users.findIndex(u => currentUserGlowbits > u.glowbits);
    if (rank === -1 && currentUserGlowbits < users[users.length - 1].glowbits) {
      return users.length + 1;
    }
    return rank === -1 ? 1 : rank + 1;
  };

  const currentUserRank = getCurrentUserRank();
  const isInTop10 = currentUserRank <= 10;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500 fill-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400 fill-gray-300" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600 fill-amber-500" />;
      default:
        return <span className="text-sm text-gray-500">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3:
        return "bg-gradient-to-r from-amber-500 to-orange-600";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <Card className="p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl">Leaderboard</h3>
          <p className="text-sm text-gray-600">Top Jurnalis LUMO</p>
        </div>
      </div>

      {/* Current User Position */}
      {!isInTop10 && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-full shrink-0">
              <span className="text-white text-sm">#{currentUserRank}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{currentUserName} (Kamu)</p>
              <div className="flex items-center gap-1 text-amber-600">
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="text-sm">{currentUserGlowbits} Glowbits</span>
              </div>
            </div>
            <p className="text-xs text-purple-600 text-center">
              Posisimu<br/>saat ini
            </p>
          </div>
        </motion.div>
      )}

      {/* Top 10 List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {users.map((user, index) => {
          const isCurrentUserInTop10 = isInTop10 && currentUserRank === user.rank;
          
          return (
            <motion.div
              key={user.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-xl border-2 transition-all ${
                isCurrentUserInTop10
                  ? "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300"
                  : user.rank <= 3
                  ? "bg-white border-orange-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
                  user.rank <= 3 ? getRankBadgeColor(user.rank) : "bg-gray-100"
                }`}>
                  {user.rank <= 3 ? (
                    getRankIcon(user.rank)
                  ) : (
                    <span className="text-sm text-gray-600">#{user.rank}</span>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {isCurrentUserInTop10 ? `${user.name} (Kamu)` : user.name}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span>{user.articlesRead} baca</span>
                    <span>•</span>
                    <span>{user.articlesWritten} tulis</span>
                  </div>
                </div>

                {/* Glowbits */}
                <div className="flex items-center gap-1 text-amber-600 shrink-0">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-medium">{user.glowbits.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress to next rank */}
      {!isInTop10 && (
        <div className="mt-4 pt-4 border-t-2 border-orange-200">
          <p className="text-xs text-gray-600 mb-2">
            {users[9].glowbits - currentUserGlowbits > 0 
              ? `Kumpulkan ${users[9].glowbits - currentUserGlowbits} Glowbits lagi untuk masuk Top 10!`
              : "Terus kumpulkan Glowbits untuk naik peringkat!"}
          </p>
        </div>
      )}

      {isInTop10 && currentUserRank > 1 && (
        <div className="mt-4 pt-4 border-t-2 border-orange-200">
          <p className="text-xs text-gray-600 mb-2">
            Kumpulkan {users[currentUserRank - 2].glowbits - currentUserGlowbits} Glowbits lagi untuk naik ke peringkat #{currentUserRank - 1}!
          </p>
        </div>
      )}

      {currentUserRank === 1 && (
        <div className="mt-4 pt-4 border-t-2 border-orange-200">
          <p className="text-xs text-center text-yellow-700 font-medium">
            🎉 Kamu adalah Jurnalis #1 LUMO!
          </p>
        </div>
      )}
    </Card>
  );
}
