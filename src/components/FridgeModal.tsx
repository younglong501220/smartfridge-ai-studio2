import React from 'react';
import { X, Refrigerator, AlertCircle, Check, ArrowRight, Thermometer, Droplets, ShieldCheck } from 'lucide-react';
import { Ingredient } from '../types';

interface FridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredients: Ingredient[];
  onToggleIngredient: (id: string) => void;
  onSelectAll: () => void;
  onGoToGenerator: () => void;
}

export const FridgeModal: React.FC<FridgeModalProps> = ({
  isOpen,
  onClose,
  ingredients,
  onToggleIngredient,
  onSelectAll,
  onGoToGenerator,
}) => {
  if (!isOpen) return null;

  const urgentItems = ingredients.filter((i) => (i.freshnessDays || 99) <= 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-[#c1c9c0]/30 overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#c0edd1]/40 via-[#f6f3ee] to-white border-b border-[#c1c9c0]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#16452a] text-white flex items-center justify-center shadow-xs">
              <Refrigerator className="w-5 h-5 text-[#a2d4af]" />
            </div>
            <div>
              <h3 className="font-['Epilogue'] text-xl font-bold text-[#16452a]">
                智慧冰箱即時庫存監控
              </h3>
              <p className="text-xs text-[#414942]">
                已透過 IoT 感測器即時同步最新鮮度與庫存狀態
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

        {/* Sensor Specs */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-[#f6f3ee] border-b border-[#c1c9c0]/20 text-xs">
          <div className="bg-white p-3 rounded-xl border border-[#c1c9c0]/30 flex items-center gap-2.5">
            <Thermometer className="w-4 h-4 text-[#16452a]" />
            <div>
              <span className="text-[#717971] block text-[10px]">冷藏區溫控</span>
              <span className="font-bold text-[#1c1c19]">3.8 °C (正常)</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#c1c9c0]/30 flex items-center gap-2.5">
            <Droplets className="w-4 h-4 text-[#3e6751]" />
            <div>
              <span className="text-[#717971] block text-[10px]">蔬果保鮮濕度</span>
              <span className="font-bold text-[#1c1c19]">86% (高保鮮)</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#c1c9c0]/30 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#6b2800]" />
            <div>
              <span className="text-[#717971] block text-[10px]">抑菌清淨濾網</span>
              <span className="font-bold text-[#1c1c19]">運作良好 (94%)</span>
            </div>
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Urgent items banner */}
          {urgentItems.length > 0 && (
            <div className="p-3.5 bg-[#ffdbcc]/40 border border-[#6b2800]/20 rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-[#6b2800] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#6b2800] block">
                  建議優先消耗（即將在 3 天內過期）:
                </span>
                <span className="text-[#414942]">
                  {urgentItems.map((i) => i.name).join('、')}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1c1c19]">全部庫存品項 ({ingredients.length})</span>
            <button
              onClick={onSelectAll}
              className="text-xs font-semibold text-[#16452a] hover:underline cursor-pointer"
            >
              全選納入料理建議
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ingredients.map((item) => {
              const isUrgent = (item.freshnessDays || 99) <= 3;
              return (
                <div
                  key={item.id}
                  onClick={() => onToggleIngredient(item.id)}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    item.selected
                      ? 'border-[#16452a] bg-[#c0edd1]/25 ring-1 ring-[#16452a]/20'
                      : 'border-[#c1c9c0]/30 hover:bg-[#f6f3ee]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs transition-colors ${
                        item.selected
                          ? 'bg-[#16452a] text-white'
                          : 'border border-[#c1c9c0] bg-white'
                      }`}
                    >
                      {item.selected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#1c1c19] block">
                        {item.name}
                      </span>
                      <span
                        className={`text-[11px] ${
                          isUrgent ? 'text-[#ba1a1a] font-semibold' : 'text-[#717971]'
                        }`}
                      >
                        剩餘保鮮期：{item.freshnessDays} 天
                      </span>
                    </div>
                  </div>

                  {isUrgent && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffdad6] text-[#ba1a1a]">
                      即期
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f6f3ee] border-t border-[#c1c9c0]/30 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#414942] hover:bg-[#ebe8e3] transition-colors cursor-pointer"
          >
            關閉
          </button>
          <button
            onClick={() => {
              onClose();
              onGoToGenerator();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16452a] text-white hover:bg-[#2f5d40] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            以目前選取食材生成食譜 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
