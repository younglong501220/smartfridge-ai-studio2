import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Timer, Flame } from 'lucide-react';
import { Recipe } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onRemoveFavorite: (id: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onSelectRecipe,
  onRemoveFavorite,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slideLeft">
        {/* Header */}
        <div className="p-6 border-b border-[#c1c9c0]/30 flex items-center justify-between bg-[#f6f3ee]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#ba1a1a] fill-[#ba1a1a]" />
            <h3 className="font-['Epilogue'] text-lg font-bold text-[#1c1c19]">
              我的收藏食譜 ({favorites.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-[#414942] hover:text-[#ba1a1a] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-[#717971] space-y-2">
              <Bookmark className="w-10 h-10 mx-auto opacity-30" />
              <p className="font-semibold text-sm">目前尚無收藏食譜</p>
              <p className="text-xs">點擊食譜卡片上的書籤圖示即可將料理儲存至此！</p>
            </div>
          ) : (
            favorites.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-[#fcf9f4] border border-[#c1c9c0]/30 rounded-2xl p-3 flex gap-3 group hover:shadow-md transition-all"
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="font-['Epilogue'] text-sm font-bold text-[#1c1c19] truncate group-hover:text-[#16452a]">
                      {recipe.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-[#717971] mt-1">
                      <span className="flex items-center gap-1">
                        <Timer className="w-3 h-3 text-[#16452a]" />
                        {recipe.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#6b2800]" />
                        {recipe.calories}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#c1c9c0]/20">
                    <button
                      onClick={() => onRemoveFavorite(recipe.id)}
                      className="text-xs text-[#717971] hover:text-[#ba1a1a] flex items-center gap-1 cursor-pointer transition-colors"
                      title="移除收藏"
                    >
                      <Trash2 className="w-3 h-3" /> 移除
                    </button>
                    <button
                      onClick={() => {
                        onSelectRecipe(recipe);
                        onClose();
                      }}
                      className="text-xs font-bold text-[#16452a] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      開始烹飪 <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
