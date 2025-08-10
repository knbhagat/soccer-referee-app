'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { UserProgress, Achievement, SkillLevel, ProgressState } from '@/types';

// Initial achievements data
const initialAchievements: Achievement[] = [
  {
    id: 'hand-signals-basic',
    title: 'Hand Signal Master',
    description: 'Master the basic hand signals every referee needs',
    icon: 'HS',
    category: 'hand-signals',
    difficulty: 'beginner',
    isCompleted: false,
    progress: 0
  },
  {
    id: 'positioning-center',
    title: 'Center Stage',
    description: 'Perfect your center referee positioning',
    icon: 'CP',
    category: 'positioning',
    difficulty: 'beginner',
    isCompleted: false,
    progress: 0
  },
  {
    id: 'whistle-technique',
    title: 'Whistle Wizard',
    description: 'Develop confident whistle techniques',
    icon: 'WT',
    category: 'communication',
    difficulty: 'beginner',
    isCompleted: false,
    progress: 0
  },
  {
    id: 'offside-judgment',
    title: 'Offside Expert',
    description: 'Master offside decision making',
    icon: 'OJ',
    category: 'positioning',
    difficulty: 'intermediate',
    isCompleted: false,
    progress: 0
  },
  {
    id: 'rule-knowledge',
    title: 'Rule Book Scholar',
    description: 'Complete comprehensive rule knowledge training',
    icon: 'RB',
    category: 'rules',
    difficulty: 'intermediate',
    isCompleted: false,
    progress: 0
  },
  {
    id: 'game-management',
    title: 'Game Manager',
    description: 'Learn advanced game management skills',
    icon: 'GM',
    category: 'leadership',
    difficulty: 'advanced',
    isCompleted: false,
    progress: 0
  }
];

// Skill levels
const skillLevels: SkillLevel[] = [
  {
    level: 1,
    title: 'Rookie Referee',
    description: 'Just starting your journey',
    requiredPoints: 0,
    currentPoints: 0,
    isUnlocked: true
  },
  {
    level: 2,
    title: 'Confident Official',
    description: 'Building your skills and confidence',
    requiredPoints: 100,
    currentPoints: 0,
    isUnlocked: false
  },
  {
    level: 3,
    title: 'Skilled Referee',
    description: 'Demonstrating solid officiating skills',
    requiredPoints: 250,
    currentPoints: 0,
    isUnlocked: false
  },
  {
    level: 4,
    title: 'Expert Official',
    description: 'Mastering the art of refereeing',
    requiredPoints: 500,
    currentPoints: 0,
    isUnlocked: false
  },
  {
    level: 5,
    title: 'Referee Champion',
    description: 'Elite level officiating excellence',
    requiredPoints: 1000,
    currentPoints: 0,
    isUnlocked: false
  }
];

// Initial state
const initialState: ProgressState = {
  userProgress: {
    totalPoints: 0,
    currentLevel: skillLevels[0],
    achievements: initialAchievements,
    completedModules: [],
    streakDays: 0,
    totalTrainingTime: 0
  },
  isLoading: false,
  error: null
};

// Action types
type ProgressAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_PROGRESS'; payload: Partial<UserProgress> }
  | { type: 'COMPLETE_MODULE'; payload: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'ADD_POINTS'; payload: number }
  | { type: 'UPDATE_STREAK'; payload: number }
  | { type: 'ADD_TRAINING_TIME'; payload: number };

// Reducer
function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        userProgress: { ...state.userProgress, ...action.payload }
      };
    
    case 'COMPLETE_MODULE':
      const newCompletedModules = [...state.userProgress.completedModules, action.payload];
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          completedModules: newCompletedModules
        }
      };
    
    case 'UNLOCK_ACHIEVEMENT':
      const updatedAchievements = state.userProgress.achievements.map(achievement =>
        achievement.id === action.payload
          ? { ...achievement, isCompleted: true, unlockedAt: new Date(), progress: 100 }
          : achievement
      );
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          achievements: updatedAchievements
        }
      };
    
    case 'ADD_POINTS':
      const newTotalPoints = state.userProgress.totalPoints + action.payload;
      const newCurrentLevel = skillLevels.find(level => 
        newTotalPoints >= level.requiredPoints && 
        (level.level === skillLevels.length || newTotalPoints < skillLevels[level.level]?.requiredPoints)
      ) || state.userProgress.currentLevel;
      
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          totalPoints: newTotalPoints,
          currentLevel: {
            ...newCurrentLevel,
            currentPoints: newTotalPoints,
            isUnlocked: true
          }
        }
      };
    
    case 'UPDATE_STREAK':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          streakDays: action.payload
        }
      };
    
    case 'ADD_TRAINING_TIME':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          totalTrainingTime: state.userProgress.totalTrainingTime + action.payload
        }
      };
    
    default:
      return state;
  }
}

// Context
interface ProgressContextType {
  state: ProgressState;
  completeModule: (moduleId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  addPoints: (points: number) => void;
  updateStreak: (days: number) => void;
  addTrainingTime: (minutes: number) => void;
  getProgressPercentage: () => number;
  getNextLevelProgress: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Provider
interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('referee-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        dispatch({ type: 'UPDATE_PROGRESS', payload: parsed });
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('referee-progress', JSON.stringify(state.userProgress));
  }, [state.userProgress]);

  const completeModule = (moduleId: string) => {
    dispatch({ type: 'COMPLETE_MODULE', payload: moduleId });
    dispatch({ type: 'ADD_POINTS', payload: 25 });
    dispatch({ type: 'ADD_TRAINING_TIME', payload: 15 });
  };

  const unlockAchievement = (achievementId: string) => {
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievementId });
    dispatch({ type: 'ADD_POINTS', payload: 50 });
  };

  const addPoints = (points: number) => {
    dispatch({ type: 'ADD_POINTS', payload: points });
  };

  const updateStreak = (days: number) => {
    dispatch({ type: 'UPDATE_STREAK', payload: days });
  };

  const addTrainingTime = (minutes: number) => {
    dispatch({ type: 'ADD_TRAINING_TIME', payload: minutes });
  };

  const getProgressPercentage = () => {
    const currentLevel = state.userProgress.currentLevel;
    const nextLevel = skillLevels.find(level => level.level === currentLevel.level + 1);
    
    if (!nextLevel) return 100;
    
    const progressInLevel = currentLevel.currentPoints - currentLevel.requiredPoints;
    const pointsNeededForNextLevel = nextLevel.requiredPoints - currentLevel.requiredPoints;
    
    return Math.min(100, Math.max(0, (progressInLevel / pointsNeededForNextLevel) * 100));
  };

  const getNextLevelProgress = () => {
    const currentLevel = state.userProgress.currentLevel;
    const nextLevel = skillLevels.find(level => level.level === currentLevel.level + 1);
    
    if (!nextLevel) return 0;
    
    return nextLevel.requiredPoints - currentLevel.currentPoints;
  };

  const value: ProgressContextType = {
    state,
    completeModule,
    unlockAchievement,
    addPoints,
    updateStreak,
    addTrainingTime,
    getProgressPercentage,
    getNextLevelProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

// Hook
export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
