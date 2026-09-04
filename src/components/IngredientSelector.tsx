import React, { useState } from 'react';
import { 
  Sprout, 
  Check, 
  Plus, 
  X, 
  Salad, 
  Fish, 
  Egg, 
  Wheat, 
  PlusCircle, 
  RotateCcw 
} from 'lucide-react';
import { Ingredient } from '../types';

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  onToggleIngredient: (id: string) => void;
  onClearAll: () => void;
  customTags: string[];
  onAddCustomTag: (name: string) => void;
  onRemoveCustomTag: (index: number) => void;
}

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  ingredients,
  onToggleIngredient,
  onClearAll,
  customTags,
  onAddCustomTag,
  onRemoveCustomTag,
}) => {
  const [customInput, setCustomInput] = useState('');

  const handleAddTag = () => {
    const trimmed = customInput.trim();
    if (trimmed) {
      onAddCustomTag(trimmed);
      setCustomInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Group by category
  const produceItems = ingredients.filter((i) => i.category === 'produce');
  const proteinItems = ingredients.filter((i) => i.category === 'proteins');
  const dairyItems = ingredients.filter((i) => i.category === 'dairy');
  const stapleItems = ingredients.filter((i) => i.category === 'staples');

  const produceCount = produceItems.filter((i) => i.selected).length;
  const proteinCount = proteinItems.filter((i) => i.selected).length;
  const dairyCount = dairyItems.filter((i) => i.selected).length;
  const stapleCount = stapleItems.filter((i) => i.selected).length;

  return (
    <section 
      id="ingredient-selector-section"
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#c1c9c0]/30 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sprout className="w-6 h-6 text-[#16452a]" />
          <h2 className="font-['Epilogue'] text-xl sm:text-2xl text-[#1c1c19] font-semibold">
            1. 選擇冰箱食材庫
          </h2>
        </div>
        <button
          id="quick-clear-btn"
          onClick={onClearAll}
          className="text-xs font-semibold text-[#414942] hover:text-[#ba1a1a] transition-colors flex items-center gap-1 cursor-pointer py-1 px-2 rounded-md hover:bg-[#ffdad6]/40"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          清空選擇
        </button>
      </div>

      {/* Category 1: Produce */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[#414942]">
          <span className="text-xs font-semibold flex items-center gap-1.5">
            <Salad className="w-4 h-4 text-[#3e6751]" />
            蔬菜生鮮 (Produce)
          </span>
          <span className="text-xs text-[#717971]">{produceCount} 項已選</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {produceItems.map((item) => (
            <button
              key={item.id}
              id={`chip-${item.id}`}
              onClick={() => onToggleIngredient(item.id)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                item.selected
                  ? 'bg-[#16452a] text-white shadow-xs'
                  : 'bg-[#f0ede9] text-[#1c1c19] hover:bg-[#ebe8e3]'
              }`}
            >
              {item.selected && <Check className="w-4 h-4 text-white" />}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category 2: Proteins */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[#414942]">
          <span className="text-xs font-semibold flex items-center gap-1.5">
            <Fish className="w-4 h-4 text-[#6b2800]" />
            肉類海鮮 (Proteins)
          </span>
          <span className="text-xs text-[#717971]">{proteinCount} 項已選</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {proteinItems.map((item) => (
            <button
              key={item.id}
              id={`chip-${item.id}`}
              onClick={() => onToggleIngredient(item.id)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                item.selected
                  ? 'bg-[#16452a] text-white shadow-xs'
                  : 'bg-[#f0ede9] text-[#1c1c19] hover:bg-[#ebe8e3]'
              }`}
            >
              {item.selected && <Check className="w-4 h-4 text-white" />}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category 3: Dairy & Eggs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[#414942]">
          <span className="text-xs font-semibold flex items-center gap-1.5">
            <Egg className="w-4 h-4 text-[#3e6751]" />
            乳製品與蛋 (Dairy & Eggs)
          </span>
          <span className="text-xs text-[#717971]">{dairyCount} 項已選</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dairyItems.map((item) => (
            <button
              key={item.id}
              id={`chip-${item.id}`}
              onClick={() => onToggleIngredient(item.id)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                item.selected
                  ? 'bg-[#16452a] text-white shadow-xs'
                  : 'bg-[#f0ede9] text-[#1c1c19] hover:bg-[#ebe8e3]'
              }`}
            >
              {item.selected && <Check className="w-4 h-4 text-white" />}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category 4: Staples */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[#414942]">
          <span className="text-xs font-semibold flex items-center gap-1.5">
            <Wheat className="w-4 h-4 text-[#3e6751]" />
            主食與乾糧 (Staples)
          </span>
          <span className="text-xs text-[#717971]">{stapleCount} 項已選</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stapleItems.map((item) => (
            <button
              key={item.id}
              id={`chip-${item.id}`}
              onClick={() => onToggleIngredient(item.id)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                item.selected
                  ? 'bg-[#16452a] text-white shadow-xs'
                  : 'bg-[#f0ede9] text-[#1c1c19] hover:bg-[#ebe8e3]'
              }`}
            >
              {item.selected && <Check className="w-4 h-4 text-white" />}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Ingredient Input Form */}
      <div className="pt-2 border-t border-[#c1c9c0]/30">
        <label 
          htmlFor="custom-ingredient-input" 
          className="text-xs text-[#414942] block mb-2 font-semibold"
        >
          手動新增冰箱食材（例如：半顆檸檬、九層塔...）
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <PlusCircle className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#717971]" />
            <input
              id="custom-ingredient-input"
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="輸入額外食材名稱..."
              className="w-full h-12 pl-10 pr-4 rounded-2xl bg-[#f6f3ee] text-[#1c1c19] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2f5d40] border border-[#c1c9c0]/30 transition-all"
            />
          </div>
          <button
            id="add-custom-btn"
            type="button"
            onClick={handleAddTag}
            className="h-12 px-5 bg-[#2f5d40] text-[#a2d4af] hover:bg-[#16452a] hover:text-white font-semibold text-sm rounded-2xl transition-colors flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" /> 加入
          </button>
        </div>

        {/* Custom tags container */}
        {customTags.length > 0 && (
          <div id="custom-tags-container" className="flex flex-wrap gap-2 mt-3">
            {customTags.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#c0edd1] text-[#274e3a] rounded-full text-xs font-semibold shadow-xs"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onRemoveCustomTag(idx)}
                  className="hover:text-[#ba1a1a] transition-colors cursor-pointer"
                  title={`移除 ${tag}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
