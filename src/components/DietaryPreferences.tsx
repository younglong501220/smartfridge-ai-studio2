import React from 'react';
import { SlidersHorizontal, Clock, Flame, ChefHat } from 'lucide-react';
import { DietaryOption, TimeOption, ApplianceOption, DifficultyOption } from '../types';

interface DietaryPreferencesProps {
  selectedDiets: DietaryOption[];
  onToggleDiet: (diet: DietaryOption) => void;
  selectedTime: TimeOption;
  onSelectTime: (time: TimeOption) => void;
  selectedAppliance: ApplianceOption;
  onSelectAppliance: (appliance: ApplianceOption) => void;
  selectedDifficulty: DifficultyOption;
  onSelectDifficulty: (difficulty: DifficultyOption) => void;
}

const DIET_OPTIONS: DietaryOption[] = [
  '低碳水 (Low Carb)',
  '高蛋白 (High Protein)',
  '全素 (Vegan)',
  '蛋奶素',
  '生酮友好',
];

const TIME_OPTIONS: TimeOption[] = [
  '15 分鐘以內',
  '30 分鐘快手',
  '60 分鐘慢煮',
];

const APPLIANCE_OPTIONS: ApplianceOption[] = [
  '氣炸鍋',
  '平底鍋',
  '烤箱',
  '電鍋',
];

const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  '新手友善',
  '中等難度',
  '大廚挑戰',
];

export const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({
  selectedDiets,
  onToggleDiet,
  selectedTime,
  onSelectTime,
  selectedAppliance,
  onSelectAppliance,
  selectedDifficulty,
  onSelectDifficulty,
}) => {
  return (
    <section 
      id="dietary-preferences-section"
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#c1c9c0]/30 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-6 h-6 text-[#16452a]" />
        <h2 className="font-['Epilogue'] text-xl sm:text-2xl text-[#1c1c19] font-semibold">
          2. 飲食偏好與烹飪條件
        </h2>
      </div>

      {/* Dietary Mode */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-[#414942] block">
          飲食模式 (Dietary)
        </span>
        <div className="flex flex-wrap gap-2">
          {DIET_OPTIONS.map((diet) => {
            const isActive = selectedDiets.includes(diet);
            return (
              <button
                key={diet}
                id={`pref-${diet}`}
                onClick={() => onToggleDiet(diet)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c0edd1] text-[#274e3a] shadow-xs'
                    : 'bg-[#f0ede9] text-[#414942] hover:bg-[#ebe8e3]'
                }`}
              >
                {isActive ? `✓ ${diet}` : diet}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time & Appliance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
        {/* Cooking Time Limit */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#414942] flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#16452a]" />
            烹飪時間限制
          </span>
          <div className="flex flex-wrap gap-2">
            {TIME_OPTIONS.map((time) => {
              const isActive = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => onSelectTime(time)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2f5d40] text-[#a2d4af] shadow-xs'
                      : 'bg-[#f0ede9] text-[#414942] hover:bg-[#ebe8e3]'
                  }`}
                >
                  {isActive ? `✓ ${time}` : time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Appliance */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#414942] flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#16452a]" />
            指定設備
          </span>
          <div className="flex flex-wrap gap-2">
            {APPLIANCE_OPTIONS.map((appliance) => {
              const isActive = selectedAppliance === appliance;
              return (
                <button
                  key={appliance}
                  onClick={() => onSelectAppliance(appliance)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2f5d40] text-[#a2d4af] shadow-xs'
                      : 'bg-[#f0ede9] text-[#414942] hover:bg-[#ebe8e3]'
                  }`}
                >
                  {isActive ? `✓ ${appliance}` : appliance}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-semibold text-[#414942] flex items-center gap-1.5">
          <ChefHat className="w-4 h-4 text-[#16452a]" />
          烹飪難度
        </span>
        <div className="flex items-center gap-2">
          {DIFFICULTY_OPTIONS.map((diff) => {
            const isActive = selectedDifficulty === diff;
            return (
              <button
                key={diff}
                onClick={() => onSelectDifficulty(diff)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2f5d40] text-[#a2d4af] shadow-xs'
                    : 'bg-[#f0ede9] text-[#414942] hover:bg-[#ebe8e3]'
                }`}
              >
                {isActive ? `✓ ${diff}` : diff}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
