import React, { useState } from 'react';
import { Radio, Menu, X, User, Sparkles, Bookmark, HeartPulse, Refrigerator } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'inventory', label: '冰箱食材庫', icon: <Refrigerator className="w-4 h-4" /> },
    { id: 'generator', label: 'AI 靈感食譜', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'favorites', label: '我的收藏', icon: <Bookmark className="w-4 h-4" /> },
    { id: 'health', label: '飲食健康', icon: <HeartPulse className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-40 bg-[#fcf9f4]/90 backdrop-blur-xl border-b border-[#c1c9c0]/30 shadow-[0_1px_8px_rgba(47,93,64,0.06)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div 
          onClick={() => onTabChange('generator')} 
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
          id="app-logo-brand"
        >
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1XTf3DpVR-Pxx8SZQUFkdHdiVsfp-oWxB6ZPzRk-98kMbPTnW1N5mF7su31CmIRPq3bF2d5GNVo3ESRw8Trj0eiqyluYiCey3vHXfBJIrBmZzn2-p7D2uSrhtW1bFsuK3mgZ-MY-0j8_gCdf6ToMbVFyBHZ6nBOgaT1GLHm3yW7z9tV6smKoWXzK7yir0eYgPrNkneHaMin1p1PaAIPXByEvlrHCM-q7mkfjYw1IjDsSyNFZwPQxXGQ8rg"
            alt="SmartFridge AI Logo"
            className="h-9 w-auto object-contain rounded-md group-hover:scale-105 transition-transform"
          />
          <span className="font-['Epilogue'] text-xl font-bold text-[#16452a] tracking-tight hidden sm:inline-block">
            SmartFridge AI 智慧冰箱食譜
          </span>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav 
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 p-1 bg-[#f6f3ee] rounded-xl border border-[#c1c9c0]/20"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#2f5d40] text-white shadow-[0_2px_8px_-2px_rgba(47,93,64,0.25)]'
                    : 'text-[#414942] hover:text-[#1c1c19] hover:bg-[#ebe8e3]'
                }`}
              >
                {item.label}
                {item.id === 'favorites' && favoritesCount > 0 && (
                  <span className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-[#a2d4af] text-[#16452a]' : 'bg-[#c0edd1] text-[#274e3a]'
                  }`}>
                    {favoritesCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Status Indicator & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Hardware Connection Status */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-[#c0edd1]/70 rounded-full border border-[#3e6751]/20">
            <span className="w-2 h-2 rounded-full bg-[#16452a] animate-pulse"></span>
            <span className="text-xs font-semibold text-[#274e3a] flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-[#16452a]" />
              冰箱連線中 · 已同步
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center p-2 rounded-xl bg-[#f6f3ee] text-[#414942] hover:bg-[#ebe8e3] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* User Profile Avatar */}
          <div 
            id="user-profile-btn"
            className="w-8 h-8 rounded-full bg-[#16452a] flex items-center justify-center text-white shadow-xs cursor-pointer hover:opacity-90 transition-opacity"
            title="使用者設定"
          >
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#c1c9c0]/30 bg-[#fcf9f4] px-4 py-3 space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 px-3 py-1.5 mb-2 bg-[#c0edd1]/60 rounded-lg text-xs font-semibold text-[#274e3a]">
            <span className="w-2 h-2 rounded-full bg-[#16452a] animate-pulse"></span>
            冰箱連線中 · 已同步 (IoT 4.2°C)
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-[#2f5d40] text-white font-semibold'
                  : 'text-[#414942] hover:bg-[#f6f3ee]'
              }`}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
              {item.id === 'favorites' && favoritesCount > 0 && (
                <span className="text-xs bg-[#c0edd1] text-[#274e3a] px-2 py-0.5 rounded-full font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
