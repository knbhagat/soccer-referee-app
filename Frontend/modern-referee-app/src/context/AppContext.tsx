'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatMessage, AppState } from '@/types';

// Action types
type AppAction =
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_LAST_MESSAGE'; payload: string }
  | { type: 'UPDATE_LAST_MESSAGE_WITH_SOURCE'; payload: { content: string; sourceInfo: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CHAT' };

// Initial state
const initialState: AppState = {
  chatHistory: [
    {
      id: 'msg-1',
      content: 'Hi there 🤗\nHow can I help you today?',
      type: 'assistant',
      timestamp: new Date(), // Use current time instead of hardcoded date
    },
  ],
  isLoading: false,
  error: null,
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
      };
    case 'UPDATE_LAST_MESSAGE':
      if (state.chatHistory.length > 0) {
        const updatedHistory = [...state.chatHistory];
        const lastMessage = updatedHistory[updatedHistory.length - 1];
        updatedHistory[updatedHistory.length - 1] = {
          ...lastMessage,
          content: action.payload,
          timestamp: new Date(), // Update timestamp to current time
        };
        return {
          ...state,
          chatHistory: updatedHistory,
        };
      }
      return state;
    case 'UPDATE_LAST_MESSAGE_WITH_SOURCE':
      if (state.chatHistory.length > 0) {
        const updatedHistory = [...state.chatHistory];
        const lastMessage = updatedHistory[updatedHistory.length - 1];
        updatedHistory[updatedHistory.length - 1] = {
          ...lastMessage,
          content: action.payload.content,
          sourceInfo: action.payload.sourceInfo,
          timestamp: new Date(), // Update timestamp to current time
        };
        return {
          ...state,
          chatHistory: updatedHistory,
        };
      }
      return state;
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_CHAT':
      return {
        ...state,
        chatHistory: [initialState.chatHistory[0]],
      };
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addMessage: (content: string, type: 'user' | 'assistant') => void;
  updateLastMessage: (content: string) => void;
  updateLastMessageWithSource: (content: string, sourceInfo: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addMessage = (content: string, type: 'user' | 'assistant') => {
    const message: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      content,
      type,
      timestamp: new Date(Date.now()),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  };

  const updateLastMessage = (content: string) => {
    dispatch({ type: 'UPDATE_LAST_MESSAGE', payload: content });
  };

  const updateLastMessageWithSource = (content: string, sourceInfo: string) => {
    dispatch({ type: 'UPDATE_LAST_MESSAGE_WITH_SOURCE', payload: { content, sourceInfo } });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  const value: AppContextType = {
    state,
    dispatch,
    addMessage,
    updateLastMessage,
    updateLastMessageWithSource,
    setLoading,
    setError,
    clearChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
