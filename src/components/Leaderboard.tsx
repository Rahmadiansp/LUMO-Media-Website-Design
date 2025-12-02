import { Card } from "./ui/card";
import { Crown, Medal, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface LeaderboardUser {
  id: string;
  name: string;
  glowbits: number;
  articlesRead: number;
  articlesWritten: number;
  rank: number;
}

interface LeaderboardProps {
  currentUserGlowbits: number;
  currentUserName?: string;
}

export function Leaderboard({ currentUserGlowbits, currentUserName = "Kamu" }: LeaderboardProps) {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
    // Refresh leaderboard every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-89810f19/users/leaderboard`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Leaderboard data:', data);
        if (data.success && data.leaderboard) {
          setUsers(data.leaderboard);
        }
      } else {
        console.error('Failed to fetch leaderboard:', response.status);
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  // Find current user in leaderboard by name
  const currentUser = users.find(u => u.name === currentUserName);
  const currentUserRank = currentUser?.rank || users.length + 1;
  const isInTop10 = currentUserRank <= 10;
  
  // Show only top 10 users
  const topUsers = users.slice(0, 10);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-[#ffcf03] fill-[#ffcf03]" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400 fill-gray-300" />;
      case 3:
        return <Medal className="w-5 h-5 text-[#ff7303] fill-[#ff7303]" />;
      default:
        return <span className="text-sm text-gray-500">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-[#ffcf03] to-[#ff7303]";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3:
        return "bg-gradient-to-r from-[#ff7303] to-[#e62422]";
      default:
        return "bg-gray-100";
    }
  };

  if (loading) {
    return (
      <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#ff7303]/10 to-[#ffcf03]/10 border-2 border-[#ff7303]/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-[#ff7303] to-[#ffcf03] rounded-xl">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl">Leaderboard</h3>
            <p className="text-sm text-gray-600">Memuat data...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#ff7303]/10 to-[#ffcf03]/10 border-2 border-[#ff7303]/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-[#ff7303] to-[#ffcf03] rounded-xl">
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
          className="mb-4 p-4 bg-gradient-to-r from-[#0360fd]/20 to-[#fe9ecd]/20 rounded-2xl border-2 border-[#0360fd]/40"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-[#0360fd] rounded-full shrink-0">
              <span className="text-white text-sm">#{currentUserRank}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{currentUserName} (Kamu)</p>
              <div className="flex items-center gap-1 text-[#ff7303]">
                <Star className="w-3 h-3 fill-[#ffcf03]" />
                <span className="text-sm">{currentUserGlowbits} Glowbits</span>
              </div>
            </div>
            <p className="text-xs text-[#0360fd] text-center">
              Posisimu<br/>saat ini
            </p>
          </div>
        </motion.div>
      )}

      {/* Top 10 List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {topUsers.map((user, index) => {
          const isCurrentUserInTop10 = isInTop10 && user.name === currentUserName;
          
          return (
            <motion.div
              key={user.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-xl border-2 transition-all ${
                isCurrentUserInTop10
                  ? "bg-gradient-to-r from-[#0360fd]/20 to-[#fe9ecd]/20 border-[#0360fd]/40"
                  : user.rank <= 3
                  ? "bg-white border-[#ff7303]/30"
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
                    <span>{user.articlesRead || 0} baca</span>
                    <span>•</span>
                    <span>{user.articlesWritten || 0} tulis</span>
                  </div>
                </div>

                {/* Glowbits */}
                <div className="flex items-center gap-1 text-[#ff7303] shrink-0">
                  <Star className="w-4 h-4 fill-[#ffcf03]" />
                  <span className="font-medium">{user.glowbits.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress to next rank */}
      {!isInTop10 && topUsers.length >= 10 && (
        <div className="mt-4 pt-4 border-t-2 border-[#ff7303]/30">
          <p className="text-xs text-gray-600 mb-2">
            {topUsers[9] && topUsers[9].glowbits > currentUserGlowbits 
              ? `Kumpulkan ${topUsers[9].glowbits - currentUserGlowbits} Glowbits lagi untuk masuk Top 10!`
              : "Terus kumpulkan Glowbits untuk naik peringkat!"}
          </p>
        </div>
      )}

      {isInTop10 && currentUserRank > 1 && topUsers.length >= currentUserRank && (
        <div className="mt-4 pt-4 border-t-2 border-[#ff7303]/30">
          <p className="text-xs text-gray-600 mb-2">
            {topUsers[currentUserRank - 2] && 
              `Kumpulkan ${topUsers[currentUserRank - 2].glowbits - currentUserGlowbits} Glowbits lagi untuk naik ke peringkat #{currentUserRank - 1}!`
            }
          </p>
        </div>
      )}

      {currentUserRank === 1 && currentUser && (
        <div className="mt-4 pt-4 border-t-2 border-[#ff7303]/30">
          <p className="text-xs text-center text-[#ff7303] font-medium">
            🎉 Kamu adalah Jurnalis #1 LUMO!
          </p>
        </div>
      )}
    </Card>
  );
}