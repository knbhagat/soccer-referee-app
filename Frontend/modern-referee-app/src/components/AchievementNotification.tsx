'use client';

import React, { useState, useEffect } from 'react';
import { useProgress } from '@/context/ProgressContext';
import { Achievement } from '@/types';

export default function AchievementNotification() {
  const { state } = useProgress();
  const [showNotification, setShowNotification] = useState(false);
  const [achievement, setAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    // Check for newly completed achievements
    const newlyCompleted = state.userProgress.achievements.find(
      a => a.isCompleted && a.unlockedAt && 
      new Date(a.unlockedAt).getTime() > Date.now() - 5000 // Within last 5 seconds
    );

    if (newlyCompleted) {
      setAchievement(newlyCompleted);
      setShowNotification(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.userProgress.achievements]);

  if (!showNotification || !achievement) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce">
      <div className="bg-[#D4DE95] border-2 border-[#636B2F] rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{achievement.icon}</div>
          <div className="flex-1">
            <h3 className="font-bold text-[#3D4127] text-sm">
              Achievement Unlocked!
            </h3>
            <p className="text-[#636B2F] text-xs">
              {achievement.title}
            </p>
            <p className="text-[#636B2F] text-xs opacity-75">
              +50 points earned
            </p>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-[#636B2F] hover:text-[#3D4127] transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
