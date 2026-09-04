import React from 'react';
import { X, HeartPulse, Sparkles, CheckCircle2, Dumbbell, ShieldCheck, Flame } from 'lucide-react';
import { Recipe } from '../types';

interface HealthModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
}

export const HealthModal: React.FC<HealthModalProps> = ({
  isOpen,
  onClose,
  recipe,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#c1c9c0]/30 overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#c0edd1]/40 to-white border-b border-[#c1c9c0]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#16452a] text-white flex items-center justify-center shadow-xs">
              <HeartPulse className="w-5 h-5 text-[#a2d4af]" />
            </div>
            <div>
              <h3 className="font-['Epilogue'] text-xl font-bold text-[#16452a]">
                AI 營養與健康分析報告
              </h3>
              <p className="text-xs text-[#414942]">
                以智能運算法精算目前推薦食譜的巨量與微量營養配比
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0ede9] text-[#414942] hover:text-[#ba1a1a] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Current dish header banner */}
          <div className="p-4 bg-[#f6f3ee] rounded-2xl border border-[#c1c9c0]/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#717971] uppercase">
                當前運算菜單
              </span>
              <h4 className="font-['Epilogue'] text-base font-bold text-[#1c1c19]">
                {recipe.title}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-[#717971] block">健康綜效評分</span>
              <span className="font-['Epilogue'] text-2xl font-bold text-[#16452a]">
                96 <span className="text-xs font-normal text-[#414942]">/ 100</span>
              </span>
            </div>
          </div>

          {/* Macro grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-[#c0edd1]/30 rounded-2xl border border-[#3e6751]/20">
              <span className="text-xs text-[#274e3a] font-semibold block">總熱量</span>
              <span className="font-['Epilogue'] text-xl font-bold text-[#16452a] mt-1 block">
                {recipe.calories}
              </span>
              <span className="text-[10px] text-[#717971]">符合每日減脂目標</span>
            </div>
            <div className="p-3 bg-[#c0edd1]/30 rounded-2xl border border-[#3e6751]/20">
              <span className="text-xs text-[#274e3a] font-semibold block">優質蛋白質</span>
              <span className="font-['Epilogue'] text-xl font-bold text-[#16452a] mt-1 block">
                42 g
              </span>
              <span className="text-[10px] text-[#717971]">肌肉修復與高飽足</span>
            </div>
            <div className="p-3 bg-[#f6f3ee] rounded-2xl border border-[#c1c9c0]/30">
              <span className="text-xs text-[#414942] font-semibold block">低升糖淨碳水</span>
              <span className="font-['Epilogue'] text-xl font-bold text-[#1c1c19] mt-1 block">
                12 g
              </span>
              <span className="text-[10px] text-[#717971]">血糖平穩無負擔</span>
            </div>
            <div className="p-3 bg-[#f6f3ee] rounded-2xl border border-[#c1c9c0]/30">
              <span className="text-xs text-[#414942] font-semibold block">單元不飽和脂肪</span>
              <span className="font-['Epilogue'] text-xl font-bold text-[#1c1c19] mt-1 block">
                14 g
              </span>
              <span className="text-[10px] text-[#717971]">頂級橄欖油好油</span>
            </div>
          </div>

          {/* Health highlights */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-[#1c1c19] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#16452a]" />
              AI 營養師觀點重點摘要
            </h5>
            <div className="p-4 bg-[#f6f3ee] rounded-2xl space-y-2.5 text-xs text-[#414942] leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16452a] shrink-0 mt-0.5" />
                <span>
                  <strong>高生物價蛋白質：</strong>以天然去皮雞胸肉為基底，提供完整 9 種必需胺基酸，有助增肌減脂。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16452a] shrink-0 mt-0.5" />
                <span>
                  <strong>免疫力微量元素：</strong>大蒜中含有豐富大蒜素（Allicin），搭配蘑菇之多醣體，可增強季節免疫力。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16452a] shrink-0 mt-0.5" />
                <span>
                  <strong>洋蔥槲皮素（Quercetin）：</strong>天然抗氧化多酚，能協助心血管循環並減少發炎反應。
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f6f3ee] border-t border-[#c1c9c0]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#16452a] text-white hover:bg-[#2f5d40] transition-colors cursor-pointer"
          >
            完成檢閱
          </button>
        </div>
      </div>
    </div>
  );
};
