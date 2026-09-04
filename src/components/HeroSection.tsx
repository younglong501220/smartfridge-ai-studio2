import React from 'react';
import { Radio, Refrigerator } from 'lucide-react';

interface HeroSectionProps {
  selectedCount: number;
  totalFridgeCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCount,
  totalFridgeCount,
}) => {
  return (
    <div className="relative w-full pt-8 pb-4">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-12 right-10 w-96 h-96 bg-[#c0edd1]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 -left-20 w-80 h-80 bg-[#ffdbcc]/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          {/* IoT Sync Status Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f0ede9] rounded-full mb-3 shadow-xs border border-[#c1c9c0]/30">
            <span className="w-2 h-2 rounded-full bg-[#16452a] animate-ping" />
            <span className="text-xs font-semibold text-[#16452a] flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-[#16452a]" />
              自動偵測冰箱剩餘食材（已同步 {totalFridgeCount} 項）
            </span>
          </div>

          {/* Hero Main Heading */}
          <h1 className="font-['Epilogue'] text-3xl sm:text-4xl lg:text-[44px] leading-tight sm:leading-[52px] font-bold text-[#16452a] tracking-tight">
            今天冰箱裡有什麼？<br className="hidden sm:inline" />
            讓 AI 為您料理靈感
          </h1>

          {/* Subheading */}
          <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#414942] mt-3 leading-relaxed">
            勾選或輸入冰箱現有食材與飲食偏好，智能主廚即刻規劃零浪費美味佳餚。
          </p>
        </div>

        {/* Quick Metrics Counter Pill */}
        <div 
          id="inventory-summary-pill"
          className="flex items-center gap-3 bg-white p-3.5 rounded-2xl shadow-sm border border-[#c1c9c0]/30 self-start md:self-auto shrink-0 transition-all hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-xl bg-[#c0edd1] flex items-center justify-center text-[#16452a] font-bold shadow-xs">
            <Refrigerator className="w-6 h-6 text-[#16452a]" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#414942] uppercase tracking-wider block">
              食材庫總覽
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#1c1c19]">
              {selectedCount} / {totalFridgeCount} 項被選中
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
