// API Response Types
export interface QueryRequest {
  query_text: string;
}

export interface QueryResponse {
  fallback: boolean;
  response: string;
  sources?: string[];
  confidence_score?: number;
  processing_time?: number;
  data_source: string;
  page_references?: string[];
  model_used: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  sourceInfo?: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Component Props Types
export interface TrainingModuleProps {
  title: string;
  description: string;
  detailedDescription?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

// State Types
export interface AppState {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'hand-signals' | 'positioning' | 'rules' | 'communication' | 'leadership';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCompleted: boolean;
  progress: number; // 0-100
  unlockedAt?: Date;
}

export interface SkillLevel {
  level: number;
  title: string;
  description: string;
  requiredPoints: number;
  currentPoints: number;
  isUnlocked: boolean;
}

export interface UserProgress {
  totalPoints: number;
  currentLevel: SkillLevel;
  achievements: Achievement[];
  completedModules: string[];
  streakDays: number;
  totalTrainingTime: number; // in minutes
}

export interface ProgressState {
  userProgress: UserProgress;
  isLoading: boolean;
  error: string | null;
}


