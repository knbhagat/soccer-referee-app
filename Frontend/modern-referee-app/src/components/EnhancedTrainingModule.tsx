'use client';

import React from 'react';
import { TrainingModuleProps } from '@/types';
import { useProgress } from '@/context/ProgressContext';

export default function EnhancedTrainingModule({
  title,
  description,
  detailedDescription,
  href,
  imageSrc,
  imageAlt,
}: TrainingModuleProps) {
  const { state, completeModule } = useProgress();
  
  // Check if module is completed
  const isCompleted = state.userProgress.completedModules.includes(href);
  
  // Get related achievement
  const relatedAchievement = state.userProgress.achievements.find(achievement => 
    achievement.title.toLowerCase().includes(title.toLowerCase().split(' ')[0]) ||
    title.toLowerCase().includes(achievement.category)
  );



  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-[#D9DED9]">
      {/* Image Section - Clean and Simple */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Stronger gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Completion Badge - Only if completed */}
        {isCompleted && (
          <div className="absolute top-4 right-4 bg-[#F4B400] text-[#1B1B1B] px-3 py-1 rounded-full text-sm font-semibold flex items-center z-10">
            <span className="mr-1">✓</span>
            Completed
          </div>
        )}
        
        {/* Content Section - Positioned within image boundaries */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-4 sm:left-auto sm:max-w-xs">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#F4B400] transition-colors drop-shadow-lg">
            {title}
          </h3>
          <p className="text-gray-100 text-xs opacity-95 leading-relaxed drop-shadow-md line-clamp-2 sm:line-clamp-2">
            {description}
          </p>
        </div>
      </div>
      
      {/* Detailed Description Section */}
      {detailedDescription && (
        <div className="p-4 sm:p-6 bg-white border-t border-[#D9DED9]">
          <div className="prose prose-sm max-w-none">
            <p className="text-[#5F6E65] leading-relaxed text-sm sm:text-base">
              {detailedDescription}
            </p>
          </div>
        </div>
      )}
      
      {/* Simple Progress Bar - Underneath the module */}
      {relatedAchievement && (
        <div className="p-3 sm:p-4 bg-[#F8F9F8] border-t border-[#D9DED9]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-[#5F6E65]">Progress</span>
            <span className="text-xs sm:text-sm font-medium text-[#5F6E65]">{relatedAchievement.progress}%</span>
          </div>
          <div className="w-full bg-[#D9DED9] rounded-full h-2 sm:h-3">
            <div 
              className="bg-[#4FA37E] h-2 sm:h-3 rounded-full transition-all duration-500"
              style={{ width: `${relatedAchievement.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
