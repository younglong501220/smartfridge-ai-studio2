import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Timer, 
  Dumbbell, 
  Signal, 
  Flame, 
  UtensilsCrossed, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Share2, 
  ChevronRight, 
  ChefHat,
  Check
} from 'lucide-react';
import { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
  alternativeRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  isLoading: boolean;
  onToggleLoading: (loading: boolean) => void;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  isInCookingList: boolean;
  onToggleCookingList: (recipeId: string) => void;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  recipe,
  alternativeRecipes,
  onSelectRecipe,
  isLoading,
  onToggleLoading,
  isFavorite,
  onToggleFavorite,
  isInCookingList,
  onToggleCookingList,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Stop speech when component unmounts or recipe changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [recipe.id]);

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('您的瀏覽器不支援語音朗讀功能');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${recipe.title}。所需食材包含：${recipe.ingredients
        .map((i) => `${i.name} ${i.amount}`)
        .join('、')}。料理步驟：${recipe.steps
        .map((s) => `步驟 ${s.step}：${s.highlight} ${s.description}`)
        .join('。')}`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'zh-TW';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `🍽️ 【SmartFridge AI 食譜分享】\n${recipe.title}\n烹飪時間：${recipe.prepTime} | 熱量：${recipe.calories}\n快來一起做美味健康的料理！`
      );
    }
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Status Bar Banner & State Toggle */}
      <div className="bg-[#f6f3ee] rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs border border-[#c1c9c0]/30">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#2f5d40] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Award className="w-4 h-4 text-[#a2d4af]" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#16452a]">
            AI 主廚精心調配推薦
          </span>
        </div>

        {/* Mode Switcher Pill Controls */}
        <div className="flex items-center bg-[#f0ede9] p-1 rounded-xl shrink-0 gap-1 border border-[#c1c9c0]/40 self-start sm:self-auto">
          <button
            id="view-completed-tab"
            type="button"
            onClick={() => onToggleLoading(false)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              !isLoading
                ? 'bg-white text-[#16452a] shadow-xs'
                : 'text-[#414942] hover:text-[#16452a]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16452a]" /> 完成食譜
          </button>
          <button
            id="view-loading-tab"
            type="button"
            onClick={() => onToggleLoading(true)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              isLoading
                ? 'bg-white text-[#16452a] shadow-xs'
                : 'text-[#414942] hover:text-[#16452a]'
            }`}
          >
            <Loader2 className={`w-3.5 h-3.5 text-[#6b2800] ${isLoading ? 'animate-spin' : ''}`} />
            模擬 AI 載入中
          </button>
        </div>
      </div>

      {/* Share Toast Notification */}
      {shareToast && (
        <div className="p-3 bg-[#16452a] text-white text-xs font-semibold rounded-xl flex items-center justify-between shadow-lg animate-fadeIn">
          <span>✨ 食譜資訊已複製至剪貼簿，可直接分享給朋友！</span>
          <Check className="w-4 h-4 text-[#a2d4af]" />
        </div>
      )}

      {/* ================= AI GENERATING / SKELETON LOADING STATE CARD ================= */}
      {isLoading ? (
        <article
          id="recipe-skeleton-card"
          className="glowing-ai-card bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col border border-[#3e6751]/30 transition-all"
        >
          {/* Dynamic AI Computation Header */}
          <div className="p-4 bg-gradient-to-r from-[#c0edd1]/30 via-[#f6f3ee] to-[#ffdbcc]/30 border-b border-[#c1c9c0]/40 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16452a] text-white text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#a2d4af] animate-spin" />
                <span className="font-bold">✨ AI 主廚正在運算食譜配方...</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3e6751] animate-ping" />
                <span className="text-[11px] font-bold text-[#3e6751]">即時生成中</span>
              </div>
            </div>

            {/* Progress Bar with breathing glow */}
            <div className="w-full bg-[#ebe8e3] h-2 rounded-full overflow-hidden relative shadow-inner">
              <div className="h-full bg-gradient-to-r from-[#3e6751] via-[#16452a] to-[#6b2800] rounded-full w-2/3 animate-pulse shadow-[0_0_12px_rgba(47,93,64,0.6)]" />
            </div>

            {/* Real-time computation steps indicator */}
            <div className="space-y-1.5 pt-1 text-xs text-[#414942]">
              <div className="flex items-center gap-1.5 text-[#16452a] font-medium ai-active-step">
                <Loader2 className="w-3.5 h-3.5 text-[#3e6751] animate-spin" />
                <span>1. 優先消耗即將過期食材 (番茄、蘑菇、洋蔥)</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-75">
                <span className="w-3.5 h-3.5 rounded-full border border-[#c1c9c0] flex items-center justify-center text-[9px] font-bold">
                  2
                </span>
                <span>依「低碳水 + 高蛋白」演算熱量卡路里最佳配比</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-60">
                <span className="w-3.5 h-3.5 rounded-full border border-[#c1c9c0] flex items-center justify-center text-[9px] font-bold">
                  3
                </span>
                <span>最佳化「30 分鐘平底鍋」少油料理步驟</span>
              </div>
            </div>
          </div>

          {/* Skeleton Hero Image & Banner */}
          <div className="relative w-full h-52 skeleton-shimmer flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[#3e6751]/5 flex flex-col items-center justify-center gap-2 text-[#3e6751]">
              <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center text-[#16452a]">
                <ChefHat className="w-8 h-8 animate-bounce text-[#16452a]" />
              </div>
              <span className="text-xs tracking-wider uppercase font-semibold text-[#3e6751]">
                AI 正在合成美饌視覺與擺盤...
              </span>
            </div>
            <div className="absolute top-3 left-3 flex gap-2">
              <div className="h-6 w-20 rounded-lg skeleton-shimmer bg-white/80 backdrop-blur-md" />
              <div className="h-6 w-24 rounded-lg skeleton-shimmer bg-white/80 backdrop-blur-md" />
            </div>
            <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-2">
              <div className="h-7 w-3/4 rounded-xl skeleton-shimmer bg-white/90 shadow-sm" />
              <div className="h-4 w-1/2 rounded-lg skeleton-shimmer bg-white/70 shadow-sm" />
            </div>
          </div>

          {/* Skeleton Metadata Badges */}
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#c1c9c0]/30 gap-2">
              <div className="h-5 w-20 rounded-md skeleton-shimmer" />
              <div className="h-5 w-24 rounded-md skeleton-shimmer" />
              <div className="h-5 w-16 rounded-md skeleton-shimmer" />
              <div className="h-5 w-16 rounded-md skeleton-shimmer" />
            </div>

            {/* Skeleton Ingredients */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-28 rounded skeleton-shimmer" />
                <div className="h-4 w-20 rounded skeleton-shimmer" />
              </div>
              <div className="grid grid-cols-2 gap-2 bg-[#f6f3ee] p-3 rounded-2xl">
                <div className="h-5 rounded-lg skeleton-shimmer" />
                <div className="h-5 rounded-lg skeleton-shimmer" />
                <div className="h-5 rounded-lg skeleton-shimmer" />
                <div className="h-5 rounded-lg skeleton-shimmer" />
                <div className="h-5 rounded-lg skeleton-shimmer" />
                <div className="h-5 rounded-lg skeleton-shimmer" />
              </div>
            </div>

            {/* Skeleton Steps */}
            <div>
              <div className="h-4 w-28 rounded skeleton-shimmer mb-2" />
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full skeleton-shimmer shrink-0 mt-0.5" />
                  <div className="w-full space-y-1.5">
                    <div className="h-4 w-full rounded skeleton-shimmer" />
                    <div className="h-4 w-4/5 rounded skeleton-shimmer" />
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full skeleton-shimmer shrink-0 mt-0.5" />
                  <div className="w-full space-y-1.5">
                    <div className="h-4 w-full rounded skeleton-shimmer" />
                    <div className="h-4 w-2/3 rounded skeleton-shimmer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Skeleton Buttons */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <div className="col-span-2 h-12 rounded-xl skeleton-shimmer" />
              <div className="h-12 rounded-xl skeleton-shimmer" />
              <div className="flex gap-2">
                <div className="flex-1 h-12 rounded-xl skeleton-shimmer" />
                <div className="flex-1 h-12 rounded-xl skeleton-shimmer" />
              </div>
            </div>
          </div>
        </article>
      ) : (
        /* ================= REAL COMPLETED RECIPE CARD ================= */
        <article
          id="recipe-complete-card"
          className="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col border border-[#c1c9c0]/30 transition-all hover:shadow-xl"
        >
          {/* Recipe Header Image Showcase */}
          <div className="relative w-full h-56 sm:h-64 overflow-hidden group">
            <img
              src={recipe.imageUrl}
              alt={recipe.imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Badges on Image */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {recipe.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold backdrop-blur-md shadow-xs ${
                    idx === 0
                      ? 'bg-white/95 text-[#16452a]'
                      : 'bg-[#ffdbcc]/95 text-[#351000]'
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="font-['Epilogue'] text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-sm leading-snug">
                {recipe.title}
              </h3>
            </div>
          </div>

          {/* Recipe Metadata Badges */}
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#c1c9c0]/30 text-xs sm:text-sm">
              <div className="flex items-center gap-1 text-[#414942] font-semibold">
                <Timer className="w-4 h-4 text-[#16452a]" />
                {recipe.prepTime}
              </div>
              <div className="flex items-center gap-1 text-[#414942] font-semibold">
                <Dumbbell className="w-4 h-4 text-[#16452a]" />
                {recipe.dietTag}
              </div>
              <div className="flex items-center gap-1 text-[#414942] font-semibold">
                <Signal className="w-4 h-4 text-[#16452a]" />
                難度：{recipe.difficulty}
              </div>
              <div className="flex items-center gap-1 text-[#6b2800] font-bold">
                <Flame className="w-4 h-4 text-[#6b2800]" />
                {recipe.calories}
              </div>
            </div>

            {/* Ingredients Used Checklist */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1c1c19]">配比食材清單</span>
                <span className="text-xs text-[#16452a] font-semibold bg-[#c0edd1]/60 px-2 py-0.5 rounded-md">
                  冰箱已全備齊
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#414942] bg-[#f6f3ee] p-3.5 rounded-2xl border border-[#c1c9c0]/20">
                {recipe.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16452a] shrink-0" />
                    <span className="text-[#1c1c19] font-medium">{ing.name}</span>
                    <span className="text-[#717971]">{ing.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Steps */}
            <div>
              <span className="text-xs font-bold text-[#1c1c19] block mb-2">
                烹飪料理步驟
              </span>
              <ol className="space-y-3">
                {recipe.steps.map((step) => (
                  <li key={step.step} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1c1c19]">
                    <span className="w-5 h-5 rounded-full bg-[#c0edd1] text-[#274e3a] text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-xs">
                      {step.step}
                    </span>
                    <p className="leading-relaxed">
                      <span className="font-bold text-[#16452a]">{step.highlight}</span>
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Interaction Row */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#c1c9c0]/30">
              <button
                id="add-cooking-list-btn"
                type="button"
                onClick={() => onToggleCookingList(recipe.id)}
                className={`col-span-2 h-12 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                  isInCookingList
                    ? 'bg-[#2f5d40] text-[#a2d4af]'
                    : 'bg-[#16452a] text-white hover:bg-[#2f5d40]'
                }`}
              >
                {isInCookingList ? (
                  <>
                    <Check className="w-4 h-4 text-[#a2d4af]" /> 已在烹飪清單
                  </>
                ) : (
                  <>
                    <UtensilsCrossed className="w-4 h-4" /> 加入烹飪清單
                  </>
                )}
              </button>

              <button
                id="speech-recipe-btn"
                type="button"
                onClick={handleToggleSpeech}
                className={`h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-[#c1c9c0]/20 ${
                  isSpeaking
                    ? 'bg-[#ffdbcc] text-[#6b2800] border-[#6b2800]/30 animate-pulse'
                    : 'bg-[#f0ede9] text-[#414942] hover:text-[#1c1c19] hover:bg-[#ebe8e3]'
                }`}
                title="語音朗讀步驟"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span className="hidden sm:inline">暫停</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">朗讀</span>
                  </>
                )}
              </button>

              <div className="flex gap-1.5">
                <button
                  id="favorite-recipe-btn"
                  type="button"
                  onClick={() => onToggleFavorite(recipe.id)}
                  className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-colors cursor-pointer border border-[#c1c9c0]/20 ${
                    isFavorite
                      ? 'bg-[#ffdad6] text-[#ba1a1a] shadow-xs'
                      : 'bg-[#f0ede9] text-[#414942] hover:text-[#ba1a1a] hover:bg-[#ebe8e3]'
                  }`}
                  title={isFavorite ? '已收藏' : '加入收藏'}
                >
                  <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#ba1a1a]' : ''}`} />
                </button>
                <button
                  id="share-recipe-btn"
                  type="button"
                  onClick={handleShare}
                  className="flex-1 h-12 bg-[#f0ede9] text-[#414942] hover:text-[#16452a] hover:bg-[#ebe8e3] rounded-xl flex items-center justify-center transition-colors cursor-pointer border border-[#c1c9c0]/20"
                  title="分享食譜"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Alternative Candidate Mini Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-[#414942]">更多建議組合方案</span>
          <span className="text-[11px] font-semibold text-[#16452a]">點選即時切換</span>
        </div>

        {alternativeRecipes.map((alt) => (
          <div
            key={alt.id}
            id={`alt-card-${alt.id}`}
            onClick={() => onSelectRecipe(alt)}
            className={`bg-white hover:bg-[#f6f3ee] transition-all rounded-2xl p-3 shadow-xs flex items-center justify-between cursor-pointer group border ${
              recipe.id === alt.id ? 'border-[#16452a] ring-2 ring-[#16452a]/20' : 'border-[#c1c9c0]/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-xs">
                <img
                  src={alt.imageUrl}
                  alt={alt.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h4 className="font-['Epilogue'] text-sm sm:text-base text-[#1c1c19] font-semibold group-hover:text-[#16452a] transition-colors leading-tight">
                  {alt.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[#414942] text-xs">
                  <span>{alt.consumesDescription}</span>
                  <span>·</span>
                  <span>{alt.summaryTime}</span>
                </div>
              </div>
            </div>
            <span className="w-8 h-8 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#414942] group-hover:bg-[#16452a] group-hover:text-white transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
